/*
* This file was generated by a tool.
* Rerun sql-ts to regenerate this file.
*/
export interface academic_terms {
  "id"?: string 
  "name": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface api_keys {
  "key"?: string 
  "name": string 
  "privilege": number 
  "is_revoked"?: boolean 
}
export interface attendances {
  "id"?: string 
  "device_id": string 
  "academic_term_id": string 
  "student_id": string 
  "rfid_tag": string 
  "login_time": any 
  "logout_time": any | null 
}
export interface course_schedules {
  "id"?: string 
  "course_id": string 
  "academic_term_id": string 
  "name": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface course_schedules_contents {
  "id"?: string 
  "course_schedule_id": string 
  "schedule_id": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface courses {
  "id"?: string 
  "name": string 
  "department_id": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface departments {
  "id"?: string 
  "name": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface enrollments {
  "id"?: string 
  "academic_term_id": string 
  "student_id": string 
  "course_id": string 
  "is_revoked"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface grades {
  "enrollment_id": string 
  "subject_id": string 
  "grade": number 
  "is_hidden"?: boolean 
  "updated_at"?: any 
}
export interface guardians {
  "student_id": string 
  "first_name": string 
  "middle_name": string | null 
  "last_name": string 
  "phone_number": string | null 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface management_accounts {
  "id"?: string 
  "username": string 
  "password": string 
  "privilege": number 
  "is_deactivated"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
  "name": string 
}
export interface professors {
  "id"?: string 
  "department_id": string 
  "first_name": string 
  "middle_name": string 
  "last_name": string 
  "phone_number": string | null 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface rfid_readers {
  "id"?: string 
  "name": string 
  "key": string 
  "is_revoked"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
  "ip_address": any 
}
export interface rfid_tags {
  "student_id": string 
  "rfid_tag"?: string 
  "is_revoked"?: boolean 
  "created_at"?: any 
}
export interface schedules {
  "id"?: string 
  "professor_id": string 
  "subject_id": string 
  "room": string 
  "class": string 
  "capacity": number 
  "time_start": any 
  "time_duration": any 
  "days": number 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
export interface students {
  "id"?: string 
  "school_id": string | null 
  "first_name": string 
  "middle_name": string 
  "last_name": string 
  "address": string 
  "sex": string 
  "birth_date": Date 
  "phone_number": string | null 
  "email_address": string | null 
  "username": string | null 
  "password": string | null 
  "is_currently_enrolled"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
  "is_hidden"?: boolean 
}
export interface subjects {
  "id"?: string 
  "code": string 
  "name": string 
  "is_hidden"?: boolean 
  "created_at"?: any 
  "updated_at"?: any 
}
