import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../components/ui/ContactForm";

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders full_name, email, and phone input fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeInTheDocument();
  });

  it("captures full_name, email, and phone and sends a POST request with headers {'Content-Type': 'text/plain;charset=utf-8'} to YOUR_WEB_APP_URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: "success" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm webAppUrl="YOUR_WEB_APP_URL" />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    fireEvent.change(nameInput, { target: { value: "Marcus Vance" } });
    fireEvent.change(emailInput, { target: { value: "marcus@enterprise.com" } });
    fireEvent.change(phoneInput, { target: { value: "+1 555-019-2834" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const [calledUrl, callOptions] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe("YOUR_WEB_APP_URL");
    expect(callOptions.method).toBe("POST");
    expect(callOptions.headers).toEqual({
      "Content-Type": "text/plain;charset=utf-8",
    });

    const parsedBody = JSON.parse(callOptions.body);
    expect(parsedBody).toEqual({
      full_name: "Marcus Vance",
      email: "marcus@enterprise.com",
      phone: "+1 555-019-2834",
    });
  });

  it("uses VITE_GOOGLE_APPS_SCRIPT_URL from environment when webAppUrl is not provided as a prop", async () => {
    const testUrl = "https://script.google.com/macros/s/AKfycbwC-uDOtssoO_KkmGD-dsisgTWeY2fc3O3hDORUSeKQB2Qb8KetLbqIkQfY4z-_8IP_Ww/exec";
    vi.stubEnv("VITE_GOOGLE_APPS_SCRIPT_URL", testUrl);

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Elena Chen" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "elena@acme.com" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "+1 800 555 0199" } });

    fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const [calledUrl] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe(testUrl);

    vi.unstubAllEnvs();
  });

  it("shows a success message upon submission and clears the input fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm webAppUrl="YOUR_WEB_APP_URL" />);

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/phone number/i) as HTMLInputElement;
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    fireEvent.change(nameInput, { target: { value: "Alex Rivera" } });
    fireEvent.change(emailInput, { target: { value: "alex@logistics.com" } });
    fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId("success-message")).toBeInTheDocument();
    });

    expect(screen.getByText(/submission confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/thank you! your information has been received/i)).toBeInTheDocument();

    // Verify fields are cleared
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(phoneInput.value).toBe("");
  });

  it("handles network errors gracefully without crashing and retains input values for retry", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm webAppUrl="YOUR_WEB_APP_URL" />);

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/phone number/i) as HTMLInputElement;
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    fireEvent.change(nameInput, { target: { value: "Marcus Vance" } });
    fireEvent.change(emailInput, { target: { value: "marcus@enterprise.com" } });
    fireEvent.change(phoneInput, { target: { value: "555-987-6543" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    expect(screen.getByText(/communication error/i)).toBeInTheDocument();
    expect(
      screen.getByText(/network connection error\. please check your network and try again\./i)
    ).toBeInTheDocument();

    // Inputs are retained so the user does not lose their typed data
    expect(nameInput.value).toBe("Marcus Vance");
    expect(emailInput.value).toBe("marcus@enterprise.com");
    expect(phoneInput.value).toBe("555-987-6543");
  });
});
