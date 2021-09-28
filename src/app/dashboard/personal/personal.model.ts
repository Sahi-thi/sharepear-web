
export interface PersonalRecords {
    records?:records[];
}

export interface records{
    record_id?: number ;
    record_type?: string ;
    record_url?: String ;
    thumbnail?: String ;
    title?: String ;
    description?: String ;
    duration?: String ;
    full_name?: String ;
    profile_picture?: String ;
    groups?: Groups[] ;
    created_by?: number ;
}

export interface Groups {
    id?: number ;
    group_name?: String;
    checked?: boolean;
}
export interface AllGroups {
    groups?: Groups[] ;
}
