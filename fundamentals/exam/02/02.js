class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this.comments = [];
        this.likes =[];
    }
    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length === 1) {
            return `${this._likes[0]} likes this story!`
        } else {
            return `${this._likes[0]} and ${this._likes.length-1} others like this story!`
        }
    }
    set likes(v) {
        this._likes =v;
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw new Error("You can't like the same story twice!");
        }
        if (this.creator == username) {
            throw new Error("You can't like your own story!");
        }
        this._likes.push(username);
        return `${username} liked ${this.title}!`;
    }
    dislike(username) {
        if (!this._likes.includes(username)) {
            throw new Error("You can't dislike this story!");
        }
        this._likes = this._likes.filter(l => l != username);
        return `${username} disliked ${this.title}`
    }
    comment(username, content, id) {
        let comment;
        for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].currentId === id) {
                comment = this.comments[i];
            }
        }

        if (id == undefined || comment == undefined) {
            let currentId = this.comments.length + 1;
            let replies = [];
            let currentComment = { currentId, username, content, replies }
            this.comments.push(currentComment)
            return `${username} commented on ${this.title}`;
        } else {
            let replyID = comment.currentId + "." + (comment.replies.length + 1);
            comment.replies.push({ replyID, username, content });
            return `You replied successfully`;
        }
    }
    toString(sortingType) {
        let result = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`
        if (sortingType === 'asc') {
            this.comments.sort((a, b) => a.currentId - b.currentId).map(c => {
                result += `-- ${c.currentId}. ${c.username}: ${c.content}\n`;
                c.replies.sort((a, b) => a.replyID - b.replyID).map(r => result += `--- ${r.replyID}. ${r.username}: ${r.content}\n`)
            })
        } else if (sortingType === 'desc') {
            this.comments.sort((a, b) => b.currentId - a.currentId).map(c => {
                result += `-- ${c.currentId}. ${c.username}: ${c.content}\n`;
                c.replies.sort((a, b) => b.replyID - a.replyID).map(r => result += `--- ${r.replyID}. ${r.username}: ${r.content}\n`)
            })
        } else if (sortingType === 'username') {
            this.comments.sort((a, b) => a.username.localeCompare(b.username)).map(c => {
                result += `-- ${c.currentId}. ${c.username}: ${c.content}\n`;
                c.replies.sort((a, b) => a.username.localeCompare(b.username)).map(r => result += `--- ${r.replyID}. ${r.username}: ${r.content}\n`)
            })
        }
        return result.trim();
    }
}
let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
art.comment("Zane", "Reply", 1);
console.log(art.toString('desc'));
console.log()
console.log(art.toString('asc'));