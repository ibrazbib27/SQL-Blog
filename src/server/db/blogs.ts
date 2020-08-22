import {Connection} from './index';


//returns all blogs
const getBlogs  = async () => {

return new Promise((res, rej) => {
    Connection.query(`SELECT b.id, b.content, b.title, b.img_src, b._created, b.authorid, a.name FROM Blogs.Blogs b`+
         ` JOIN Blogs.Authors a on b.authorid = a.id`, (err, result) => {
        if(err) return rej(err);
        res(result);
    });
});
}
//returns all chirps
const getAuthors  = async () => {

    return new Promise((res, rej) => {
        Connection.query("SELECT id, name FROM Blogs.Authors;", (err, result) => {
            if(err) return rej(err);

            res(result);
        });
    });
}
//returns all chirps
const getTags  = async () => {

    return new Promise((res, rej) => {
        Connection.query("SELECT id, name FROM Blogs.Tags;", (err, result) => {
            if(err) return rej(err);

            res(result);
        });
    });
}

//returns chirps based on username parameter (advanced lab requirement)
const getBlogTags = async (id: string) => {
    return new Promise((res, rej) => {
        Connection.query(`CALL Blogs.spBlogTags(?);`, [parseInt(id)],(err, result, fields) => {
            if(err) return rej(err);
            res(result);
        });
    });
}

//posts new chirp to database
const createBlog = async (blog: any) => {
    return new Promise((res, rej) => {
        Connection.query(`INSERT INTO Blogs.Blogs (content, title, img_src, _created, authorid) ` +
            `VALUES (?, ?, ?, ?, ?);`, [blog.content, blog.title, blog.img_src, blog._created, blog.authorid],
            (err, result, fields) => {
            if(err) return rej(err);

            res(result);
        });
    });
}

//updates new user values to user table and mentions table (used heavily with editing chirp and less with creating chirp)
const createBlogtoTagEntry = async (id: any) => {
    return new Promise((res, rej) => {
        Connection.query(`CALL Blogs.spBlogToTagMatch(?);`, [parseInt(id.tagid)],(err, result, fields) => {
            if(err) return rej(err);
            res(result);
        });
    });
}


//updates new user values to user table and mentions table (used heavily with editing chirp and less with creating chirp)
const postTags = async (blogTags: any) => {
    return new Promise((res, rej) => {
        Connection.query(`INSERT INTO Blogs.BlogTags (blogid, tagid) VALUE ('${blogTags.blogid}', '${blogTags.tagid}')`, (err, result) => {
            if(err) return rej(err);
            res(result);
        });
    });
}





//gets chirp based on id
const getBlog = async (id: string) => {

    return new Promise((res, rej) => {
        Connection.query(`SELECT b.id, b.content, b.title, b.img_src, b._created, b.authorid, a.name FROM Blogs.Blogs b`+
            ` JOIN Blogs.Authors a on b.authorid = a.id WHERE b.id = ${id}`, (err, result) => {
            if(err) return rej(err);
            res(result);
        });
    });
}

//deletes chirp based on id and deletes all mentions of the chirp and deletes any unused usernames in the users table
const deleteBlog = async (id: string) => {
    return new Promise((res, rej) => {
        Connection.query(`DELETE FROM Blogs.Blogs WHERE id = '${id}';`, (err, result) => {
            if(err) return rej(err);

            res(result);
        });
    });
}

//deletes chirp based on id and deletes all mentions of the chirp and deletes any unused usernames in the users table
const deleteTags = async (id: string) => {
    return new Promise((res, rej) => {
        Connection.query(`DELETE FROM Blogs.BlogTags WHERE blogid = '${id}';`, (err, result) => {
            if(err) return rej(err);

            res(result);
        });
    });
}

//updates chirp based on id
const updateBlog = async (id: string, blog: any) => {
    return new Promise((res, rej) => {

                Connection.query('UPDATE Blogs.Blogs ' +
                    'SET `content` = ?, `title` = ?, `img_src` = ?, `_created` = ?' +
                    'WHERE `id` = ?', [blog.content, blog.title, blog.img_src, blog._created, id],
                    (err, result, fields) => {
                    if (err) return rej(err);

                    res(result);
                });

    });
}
export default {
    CreateBlog: createBlog,
    GetAuthors: getAuthors,
    GetTags: getTags,
    DeleteBlog: deleteBlog,
    GetBlogs: getBlogs,
    GetBlogTags: getBlogTags,
    CreateBlogtoTagEntry: createBlogtoTagEntry,
    GetBlog: getBlog,
    UpdateBlog: updateBlog,
    DeleteTags: deleteTags,
    PostTags: postTags
};