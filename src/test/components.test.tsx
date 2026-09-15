import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GooeyInput } from "../components/ui/GooeyInput";
import { TextFlippingBoard } from "../components/ui/TextFlippingBoard";
import { FocusCards } from "../components/ui/FocusCards";
import Navbar from "../components/layout/Navbar";
import FloatingDock from "../components/layout/FloatingDock";

describe("Interactive UI Components", () => {
  it("renders Navbar and all 4 navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("ZestFlow")).toBeInTheDocument();
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("How It Works").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About Us").length).toBeGreaterThanOrEqual(1);
  });

  it("renders FloatingDock with icons and quick access links", () => {
    render(
      <MemoryRouter>
        <FloatingDock />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("handles GooeyInput submission properly", () => {
    const handleSubmit = vi.fn();
    render(
      <GooeyInput
        placeholder="test@zestflow.ai"
        buttonLabel="Submit Test"
        onSubmit={handleSubmit}
      />
    );
    const input = screen.getByPlaceholderText("test@zestflow.ai");
    fireEvent.change(input, { target: { value: "lead@acme.com" } });
    const button = screen.getByText("Submit Test");
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledWith("lead@acme.com");
  });

  it("renders TextFlippingBoard with characters", () => {
    const { container } = render(<TextFlippingBoard text="ACTIVE 99%" />);
    expect(container).toBeInTheDocument();
  });

  it("renders FocusCards properly with title and tags", () => {
    const cards = [
      {
        title: "Test Architecture Study",
        tag: "SYSTEMS",
        readTime: "3 min read",
        src: "https://images.unsplash.com/photo-1?w=400",
      },
    ];
    render(<FocusCards cards={cards} />);
    expect(screen.getByText("Test Architecture Study")).toBeInTheDocument();
    expect(screen.getByText("SYSTEMS")).toBeInTheDocument();
  });
});