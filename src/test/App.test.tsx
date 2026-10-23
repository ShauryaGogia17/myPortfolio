import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "@/App";

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  localStorage.clear();
  document.documentElement.classList.add("dark");
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Portfolio", () => {
  it("shows the profile, engineering roles, and résumé download", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Shaurya Gogia", level: 1 })).toBeVisible();
    for (const role of [
      "Software Engineer",
      "AI/ML Engineer",
      "Data Engineer",
      "Distributed Systems",
      "Cloud Services",
    ]) {
      expect(
        within(screen.getByLabelText("Engineering specialisations")).getByText(role, {
          exact: true,
        }),
      ).toBeVisible();
    }
    expect(screen.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
      "href",
      "/resume.pdf",
    );
    expect(screen.getByRole("link", { name: "Download Resume" })).toHaveAttribute("download");
  });

  it("filters projects and restores all résumé projects", () => {
    render(<App />);
    const projects = within(document.getElementById("projects")!);
    fireEvent.click(projects.getByRole("button", { name: "Machine Learning" }));
    expect(
      projects.getByRole("heading", { name: "Hybrid Facial Emotion Detection and Classification" }),
    ).toBeVisible();
    expect(projects.queryByRole("heading", { name: "AI Study Helper" })).not.toBeInTheDocument();
    fireEvent.click(projects.getByRole("button", { name: "All" }));
    expect(projects.getByRole("heading", { name: "AI Study Helper" })).toBeVisible();
    expect(
      projects.getByRole("heading", { name: "AI-Driven IoT Crop Disease Management System" }),
    ).toBeVisible();
    expect(projects.getByRole("heading", { name: "MedGuide AI" })).toBeVisible();
  });

  it("preserves a saved theme and lets visitors switch it", () => {
    localStorage.setItem("theme", "light");
    render(<App />);
    expect(document.documentElement).not.toHaveClass("dark");
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("opens the small-screen menu and closes it after navigation", () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const links = screen.getAllByRole("link", { name: "Research" });
    const researchLink = links[links.length - 1]!;
    researchLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(researchLink);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("offers a way home for an unknown path", () => {
    window.history.replaceState({}, "", "/missing-page");
    render(<App />);
    expect(screen.getByRole("heading", { name: "404" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Back to portfolio" })).toHaveAttribute("href", "/");
  });

  it.each(["credentials", "experience"])(
    "opens the internship certificate with its details from %s and restores focus on close",
    async (sectionId) => {
      render(<App />);
      const section = within(document.getElementById(sectionId)!);
      const trigger = section.getAllByRole("button", {
        name: "View certificate and details for Software Developer Internship Certificate",
      })[0]!;
      trigger.focus();
      fireEvent.click(trigger);

      const dialog = within(
        await screen.findByRole("dialog", { name: "Software Developer Internship Certificate" }),
      );
      expect(dialog.getByRole("heading", { name: "About this certification" })).toBeVisible();
      expect(dialog.getByText("Sonam")).toBeVisible();
      expect(dialog.getByText("Prem Chandra")).toBeVisible();
      expect(dialog.getByText("Shaurya Gogia", { exact: true })).toBeVisible();
      expect(dialog.getByRole("img")).toHaveAttribute(
        "src",
        "/certificates/persistent-infotech-internship.jpg",
      );
      expect(dialog.getByRole("link", { name: "Open original JPG ↗" })).toHaveAttribute(
        "href",
        "/certificates/persistent-infotech-internship.jpg",
      );
      expect(dialog.getByRole("link", { name: "Download certificate ↓" })).toHaveAttribute(
        "download",
      );

      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      await waitFor(() => expect(trigger).toHaveFocus());
    },
  );

  it("keeps all certificates in their credential buttons without a separate gallery", async () => {
    render(<App />);
    expect(
      screen.queryByRole("heading", { name: "Certificates & participation" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /certificate awarded to/ })).not.toBeInTheDocument();
    const credentials = within(document.getElementById("credentials")!);
    for (const [title, file, format] of [
      [
        "Web Development Internship Completion Certificate",
        "academor-web-development-internship.png",
        "PNG",
      ],
      ["Software Developer Internship Certificate", "persistent-infotech-internship.jpg", "JPG"],
      ["Smart India Hackathon 2024 · Internal Round", "smart-india-hackathon-2024.pdf", "PDF"],
      ["Deeksharambh 2024 · Volunteer", "deeksharambh-2024-volunteer.pdf", "PDF"],
    ] as const) {
      fireEvent.click(
        credentials.getByRole("button", { name: `View certificate and details for ${title}` }),
      );
      const dialog = within(await screen.findByRole("dialog", { name: title }));
      expect(dialog.getByRole("img")).toBeVisible();
      expect(dialog.getByRole("list", { name: "Certificate topics" })).toBeVisible();
      expect(dialog.getByRole("link", { name: `Open original ${format} ↗` })).toHaveAttribute(
        "href",
        `/certificates/${file}`,
      );
      fireEvent.click(dialog.getByRole("button", { name: "Close" }));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    }
  });
});
