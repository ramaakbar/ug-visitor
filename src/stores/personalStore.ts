import create from 'zustand';

export type PersonalDataType = {
  name: string;
  noVisitor?: string;
  nik?: string;
};

interface PersonalState {
  personal: PersonalDataType;
  setPersonal: (data: PersonalDataType) => void;
}

export const usePersonalStore = create<PersonalState>((set) => ({
  personal: {
    name: '',
    noVisitor: '',
    nik: '',
  },
  setPersonal: (data) =>
    set(() => ({
      personal: { ...data },
    })),
}));
