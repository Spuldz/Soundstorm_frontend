
export type ISong = {
    _id: string,
    name?: string,
    desc?: string,
    fileName?: string,
    public?: boolean
    owner?: string
    tags?:  string[],
    thumbnail?: string,
    ownerName?: string
}