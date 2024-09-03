import { Post, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export type PostDto = {
    url: string,
    description: string,
    source: string
}

export const createPostInDb = async (postDto: PostDto, userId: string) => {
    const {url, description, source} = postDto
    try {
        const res = await prisma.post.create({
            data: {
                url,
                description,
                source,
                userId
            }
        })
        return res
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('error happened in createPostInDb: ', err.message)
        }
        if (err instanceof Prisma.PrismaClientValidationError) {
            console.error('error happened in createPostInDb: ', err.message)
        }
    }
}

export const createManyPostsInDb = async (posts: Post[]) => {

}

export const gellAllPostsForUserInDb = async (userId: string) => {
    try {
        const res = await prisma.post.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return res
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('error happened in gellAllPostsInDb: ', err.message)
        }
    }
}

export const getUserByEmailInDb = async (email: string) => {
    try {
        const res = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return res
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('error happened in createPostInDb: ', err.message)
        }
        if (err instanceof Prisma.PrismaClientValidationError) {
            console.error('error happened in createPostInDb: ', err.message)
        }
    }
}