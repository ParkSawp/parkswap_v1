import BlogReveal from "@/src/components/BlogReveal/BlogReveal";


export default function BlogContainer({ children, className, delay=.25 }) {

    return (
        <BlogReveal className={'blog-container '+className} delay={delay} >
            {children}
        </BlogReveal>
    );
}