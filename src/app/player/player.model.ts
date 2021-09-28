export class AllCommentsResponse {
    activityId?: number;
    name?: string;
    profilePic?: string;
    content?: string;
    // tslint:disable-next-line: variable-name
    comment_type?: string;
    comment_category ?:string;
    duration_start?: string;
    duration_end?: string;
    status?: string;
    updated_at?: string;
    active_comments ?:number;
    completed_comments ? :number;
    co_ordinates ?: Coordinates[];
}
export class Coordinates{
    x ?:string;
    y? :string;
}
export class AddNewCommentResponse {
    content?: string;
    comment_type?: string;
    duration_start?: string;
    duration_end?: string;
    status?: string;
}
export class SubCommentsResponse {

    comment_id?: number;
    name?: string;
    profile_pic?: string;
    content?: string;
}
export class AddNewSubCommentResponse{
    content ?:string;
}
