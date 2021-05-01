export interface pagination_args {
    "page"?: number
    "limit"?: number
}
export interface search_name_args {
    "fname"?: string,
    "mname"?: string,
    "lname"?: string,
}

export interface search_schedule_args {
    "s_name"?: string,
    "p_fname"?: string,
    "p_mname"?: string,
    "p_lname"?: string,
    "room"?: string,
    "class"?: string,
    [index: string] : any
}

export interface search_course_schedule_args {
    "name"?: string,
    "c_name"?: string,
    "a_name"?: string,
    [index: string] : any
}

export interface schedules_external {
    "id"?: string 
    "professor_id": string 
    "subject_id": string 
    "room": string 
    "class": string 
    "capacity": number 
    "time_start": string
    "time_duration": string
    "days": number | string[]
    "is_hidden"?: boolean 
    "created_at"?: any 
    "updated_at"?: any 
}

export interface course_schedules_contents_external {
    "id"?: string 
    "course_schedule_id": string 
    "course_schedule_name": string
    "professor_id": string
    "professor_first_name": string
    "professor_middle_name": string
    "professor_last_name": string
    "subject_id": string
    "subject_name": string
    "subject_code": string
    "subject_unit_lec": number
    "subject_unit_lab": number
    "schedule_id": string 
    "schedule_room": string
    "schedule_class": string
    "schedule_capacity": string
    "schedule_time_start": string
    "schedule_time_duration": object
    "schedule_days": number | string[]
    "created_at"?: any 
  }

export interface students_credentials_put {
    "student_id": string 
    "username"?: string | null
    "password"?: string | null
    "updated_at"?: any 
}

export interface faculties_put {
    "id"?: string 
    "first_name"?: string | null
    "middle_name"?: string | null 
    "last_name"?: string | null
    "address"?: string | null 
    "phone_number"?: string | null 
    "username"?: string | null
    "password"?: string | null
    "privilege"?: number | string[] | null
    "is_deactivated"?: boolean 
    "created_at"?: any 
    "updated_at"?: any 
}

export interface faculties_external {
    "id"?: string 
    "first_name": string 
    "middle_name": string | null 
    "last_name": string 
    "address": string | null 
    "phone_number": string | null 
    "username": string 
    "password": string 
    "privilege": number | string[]
    "is_deactivated"?: boolean 
    "created_at"?: any 
    "updated_at"?: any 
}