import { createContext, useContext, useState, ReactNode } from "react";

export interface AuditFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  full_name?: string;
  email?: string;
  bottleneck?: string;
  volume?: string;
}

interface AuditModalContextType {
  isOpen: boolean;
  openAuditModal: (initialData?: Partial<AuditFormData>) => void;
  closeAuditModal: () => void;
  initialData: Partial<AuditFormData>;
}

const defaultContextValue: AuditModalContextType = {
  isOpen: false,
  openAuditModal: () => {},
  closeAuditModal: () => {},
  initialData: {},
};

const AuditModalContext = createContext<AuditModalContextType>(defaultContextValue);

export function AuditModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<AuditFormData>>({});

  const openAuditModal = (data?: Partial<AuditFormData>) => {
    if (data) setInitialData(data);
    setIsOpen(true);
  };

  const closeAuditModal = () => {
    setIsOpen(false);
    setInitialData({});
  };

  return (
    <AuditModalContext.Provider
      value={{ isOpen, openAuditModal, closeAuditModal, initialData }}
    >
      {children}
    </AuditModalContext.Provider>
  );
}

export function useAuditModal() {
  const context = useContext(AuditModalContext);
  return context || defaultContextValue;
}
