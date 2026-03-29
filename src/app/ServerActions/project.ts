"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { imagekit } from "@/lib/imagekit";

export const upsertProject = async (formData: FormData) => {
  try {
    const id = (formData.get("id") as string) || "";

    const title = (formData.get("title") as string) || "";
    const location = (formData.get("location") as string) || "";
    const description = (formData.get("description") as string) || "";
    const fullDescription = (formData.get("fullDescription") as string) || "";
    const beneficiaries = (formData.get("beneficiaries") as string) || "";
    const timeline = (formData.get("timeline") as string) || "";
    const progress = parseInt((formData.get("progress") as string) || "0", 10);

    // Parse arrays
    const parseArray = (key: string) => {
      try {
        const raw = formData.get(key) as string;
        const parsed = JSON.parse(raw || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const objectives = parseArray("objectives");
    const impact = parseArray("impact");

    // IMAGE HANDLING
    const existingImage = (formData.get("existingImage") as string) || "";
    const newFile = formData.get("image") as File | null;

    let imageUrl = existingImage;

    if (newFile && newFile.size > 0) {
      const buffer = Buffer.from(await newFile.arrayBuffer());

      const result = await imagekit.upload({
        file: buffer,
        fileName: `project_${Date.now()}_${newFile.name.replace(/\s+/g, "_")}`,
        folder: "projects",
      });

      imageUrl = result.url;
    }
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[\u0980-\u09FF]/g, "") 
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    const words = baseSlug.split("-").slice(0, 4);

    let slug = words.join("-");

    if (!slug || slug.length < 3) {
      slug = `project-${Date.now().toString().slice(-4)}`;
    }

    // Check existing slug (FOR UNIQUENESS)
    const existingSlug = await db.project.findUnique({
      where: { slug },
    });

    const projectData = {
      title,
      slug,
      location,
      description,
      fullDescription,
      beneficiaries,
      timeline,
      progress,
      objectives,
      impact,
      image: imageUrl,
    };

    let project;

    // UPDATE
    if (id && id.trim() !== "" && id !== "undefined") {
      if (existingSlug && existingSlug.id !== id) {
        projectData.slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      project = await db.project.update({
        where: { id },
        data: projectData,
      });
    }

    // CREATE
    else {
      if (existingSlug) {
        projectData.slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      project = await db.project.create({
        data: projectData,
      });
    }

    // REFRESH UI
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${projectData.slug}`);

    return { success: true, data: project };
  } catch (error: any) {
    console.error("Project Save Error:", error);
    return {
      success: false,
      error: error.message || "Failed to save project",
    };
  }
};
// SOFT DELETE PROJECT (move to trash)
export const softDeleteProject = async (id: string) => {
  try {
    await db.project.update({
      where: { id },
      data: { deleted: true },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

    return { success: true };
  } catch (error: any) {
    console.error("Soft Delete Error:", error);
    return { success: false, error: "Failed to move project to trash" };
  }
};

// RESTORE PROJECT FROM TRASH
export const restoreProject = async (id: string) => {
  try {
    await db.project.update({
      where: { id },
      data: { deleted: false },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

    return { success: true };
  } catch (error: any) {
    console.error("Restore Error:", error);
    return { success: false, error: "Failed to restore project" };
  }
};

// PERMANENT DELETE
export const deleteProjectPermanent = async (id: string) => {
  try {
    await db.project.delete({ where: { id } });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");

    return { success: true };
  } catch (error: any) {
    console.error("Permanent Delete Error:", error);
    return { success: false, error: "Delete failed" };
  }
};

// GET ALL PROJECTS (optionally trashed)
export const getProjects = async (trashed: boolean = false) => {
  try {
    const projects = await db.project.findMany({
      where: trashed ? { deleted: true } : { deleted: false },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error: any) {
    return { success: false, error: "Failed to fetch projects" };
  }
};

// GET SINGLE PROJECT BY SLUG
export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await db.project.findUnique({ 
      where: { slug } 
    });
    return { success: true, data: project };
  } catch (error: any) {
    return { success: false, error: "Project not found" };
  }
};