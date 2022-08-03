type PB = {
    ManagementPanelRegistrar: number,
    ManagementPanelAdmin: number,
    StudentInformationSystem: number,
    [index: string]: number,
}

type CB = {
    StudentCenter: number,
    ManagementPanel: number,
    StudentInformationSystem: number,
    [index: string]: number,
}

// Faculty's access privileges
const facultyPrivilegeBits: PB = {
    ManagementPanelRegistrar:   0b0000_0001,
    ManagementPanelAdmin:       0b0000_0010,
    StudentInformationSystem:   0b0010_0000,
}

// Determines an API key's assigned component
const systemComponentBits: CB = {
    StudentCenter:              0b0000_0001,
    ManagementPanel:            0b0000_0010,
    StudentInformationSystem:   0b0000_1000,
}

export { facultyPrivilegeBits, systemComponentBits }