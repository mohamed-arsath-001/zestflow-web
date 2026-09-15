import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import HowItWorks from "../pages/HowItWorks";
import Services from "../pages/Services";
import About from "../pages/About";

describe("ZestFlow 4 Core Architecture Pages", () => {
  it("renders Home page with hero, bento grid, and telemetry stream", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/PRODUCTION-GRADE AI INFRASTRUCTURE/i)).toBeInTheDocument();
    expect(screen.getByText(/Deterministic Code, Not Black Boxes/i)).toBeInTheDocument();
    expect(screen.getByText(/ENGINEERED FOR PRODUCTION-GRADE RELIABILITY/i)).toBeInTheDocument();
  });

  it("renders How It Works page with comparison and deployment roadmap", () => {
    render(
      <MemoryRouter>
        <HowItWorks />
      </MemoryRouter>
    );
    expect(screen.getByText(/Self-Governing Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/The Transformation: Before vs. After/i)).toBeInTheDocument();
    expect(screen.getByText(/14-Day Rapid Deployment Roadmap/i)).toBeInTheDocument();
  });

  it("renders Services page with expandable cards and feasibility calculator", () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bespoke AI Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Service Solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Operational Feasibility & Pipeline Calculator/i)).toBeInTheDocument();
  });

  it("renders About page with 3D cards and philosophy", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/Pioneering Deterministic Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/Radical Determinism/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero Data Leakage Pledge/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Philosophy/i)).toBeInTheDocument();
  });

  
});
