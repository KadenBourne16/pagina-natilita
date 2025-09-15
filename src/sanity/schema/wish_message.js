import {defineField, defineType} from "sanity"

export const wish_message = defineType({
    name: "wish_message",
    type: "document",
    title: "Wish Message",
    icon :  () =>  "🌠",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: "username",
            title: "Username",
            type: "string"
        }),
        defineField({
            name: "message",
            title: "Message",
            type: "text"
        })
    ],

    preview: {
        select: {
            title: 'username',
            media: 'image'
        }
    },
    prepare(selection){
        const {username} = selection;
        return{
            title: [username].filter(Boolean).join("")
        }
    }
})