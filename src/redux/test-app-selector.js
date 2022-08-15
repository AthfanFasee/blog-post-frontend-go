

const UserIDParamstate = {
    UserIDParam: 1
}

const PostIDstate = {
    PostID: 1
}

export const testUseUserIDParamSelector = (f) => f(UserIDParamstate);
export const testUsePostIDSelector = (f) => f(PostIDstate);