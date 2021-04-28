// Faculty's access privileges
const facultyPrivilegeBits = {
    ManagementPanelRegistrar:   0b0000_0001,
    ManagementPanelAdmin:       0b0000_0010,
    Attendance:                 0b0001_0000,
    StudentInformationSystem:   0b0010_0000,
}

// Determines an API key's assigned component
const componentBits = {
    StudentCenter:              0b0000_0001,
    ManagementPanel:            0b0000_0010,
    AttendanceTracker:          0b0000_0100,
    StudentInformationSystem:   0b0000_1000,
}