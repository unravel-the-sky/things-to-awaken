'use server'

import { createManyPostsInDb, createPostInDb, gellAllPostsForUserInDb, getUserByEmailInDb, PostDto } from "@/prisma/databaseActions"
import { Post } from "@prisma/client"
import { getServerSession } from "next-auth"
import { ParsedPostObject } from "../components/client/Uploader"

const createPostDtoFromInput = (url: string, description: string): PostDto => {
    let source = 'unknown'
    if (url.includes("youtube") || url.includes("youtu.be")) {
        source = "youtube";
    } else if (url.includes("instagram")) {
        source = "instagram";
    }

    const post: PostDto = {
        url, description, source
    }

    return post
}

export const createPost = async(parsedPost: ParsedPostObject) => {
    console.log('called createPost')
    const session = await getServerSession()
    
    if (session && session.user.email) {
        try {
            const { url, description, source } = parsedPost
            const postDto = createPostDtoFromInput(url, description)
            const user = await getUserByEmailInDb(session.user.email)
            const res = await createPostInDb(postDto, user?.id || '')
            return res;
        } catch (err) {
            console.error('error: ', err)
        }
    }

    throw new Error('user session is not registered, do nothing for now')
}

export const createManyPosts = async(parsedPosts: ParsedPostObject[]) => {
    console.log('called createPost')
    const session = await getServerSession()
    
    // if (session && session.user.email) {
    //     try {
    //         const user = await getUserByEmailInDb(session.user.email)
    //         const res = await createManyPostsInDb(posts)
    //         return res;
    //     } catch (err) {
    //         console.error('error: ', err)
    //     }
    // }
}

export const getAllPosts = async(): Promise<Post[] | undefined> => {
    console.log('called createPost')
    console.log('called createPost')
    const session = await getServerSession()
    
    if (session && session.user.email) {
        try {
            const user = await getUserByEmailInDb(session.user.email)
            const res = await gellAllPostsForUserInDb(user?.id || '')
            return res;
        } 
        catch (err) {
            console.error('error: ', err)
        }
    }
}