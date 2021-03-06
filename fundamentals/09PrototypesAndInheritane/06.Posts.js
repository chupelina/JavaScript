function solve(){
    class Post{
        constructor(title, content){
            this.title=title;
            this.content=content;
        }
        toString(){
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }
    class SocialMediaPost extends Post{
        constructor(title, content, likes, dislikes){
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }
        addComment(currComment){
          this.comments.push(currComment);
        }
        toString(){
            let result = super.toString();
            result+=`\nRating: ${this.likes-this.dislikes}\n`;
            if(this.comments.length==0){
              return  result.trim();
            }
            result+=`Comments:\n`
            this.comments.forEach(c=> result+=` * ${c}\n`);
            return result.trim();
        }

    }
    class BlogPost extends Post{
        constructor(title, content, views){
            super(title, content);
            this.views=views;
        }
        view(){
            this.views++;
            return this;
        }
        toString(){
            let result = super.toString();
            result+=`\nViews: ${this.views}`;
            return result.trim();
        }

    }
    return{Post, SocialMediaPost, BlogPost}
}
let classes= solve();

let test = new classes.BlogPost("TestTitle", "TestContent", 5);

test.view().view().view();
console.log(test.toString())