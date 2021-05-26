import { facultyPrivilegeBits as fPrivilegeBits } from './authConstants'

const decodePrivilege = (bits: number) => {
    let privilegeArr: string[] = []
    for (const privilege in fPrivilegeBits) {
        if ((fPrivilegeBits[privilege] & bits) !== 0) {
            privilegeArr.push(privilege)
        }
    }
    return privilegeArr
}

export { decodePrivilege }