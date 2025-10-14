import React, { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MessageSquare, Share2 } from "lucide-react"
import CommentBox from "@/components/CommentBox"
import axios from "axios"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { setBlog } from "@/redux/blogSlice"
import { toast } from "sonner"

const BlogView = () => {
  const { blogId } = useParams()
  const { blog } = useSelector((store) => store.blog)
  const { user } = useSelector((store) => store.auth)
  const { comment } = useSelector((store) => store.comment)

  const [selectedBlog, setSelectedBlog] = useState(null)
  const [blogLike, setBlogLike] = useState(0)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()

  // ✅ Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/blog/blog/${blogId}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          setSelectedBlog(res.data.blog)
          setBlogLike(res.data.blog.likes?.length || 0)
          setLiked(res.data.blog.likes?.includes(user?._id) || false)
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to load blog.")
      }
    }
    fetchBlog()
    window.scrollTo(0, 0)
  }, [blogId, user?._id])

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like"
      const res = await axios.get(
        `http://localhost:5000/api/v1/blog/${selectedBlog?._id}/${action}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1
        setBlogLike(updatedLikes)
        setLiked(!liked)

        // update redux blog state
        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        )
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Error while liking blog.")
    }
  }

  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate)
    const options = { day: "numeric", month: "long", year: "numeric" }
    return date.toLocaleDateString("en-GB", options)
  }

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog!",
          text: "Read this amazing blog post.",
          url: blogUrl,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard!")
      })
    }
  }

  if (!selectedBlog) {
    return (
      <div className="pt-14 max-w-6xl mx-auto p-10">
        <p>Loading blog...</p>
      </div>
    )
  }

  // ✅ Get related blogs
  const relatedBlogs = blog
    .filter(
      (b) =>
        b._id !== selectedBlog._id &&
        b.tags?.some((tag) => selectedBlog?.tags?.includes(tag))
    )
    .slice(0, 3)

  return (
    <div
      className="pt-14"
      style={{
        fontFamily:
          "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 flex gap-8">
        {/* LEFT COLUMN - BLOG CONTENT */}
        <div className="max-w-3xl w-full">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/"}>
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={"/blogs"}>
                  <BreadcrumbLink>Blogs</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Blog Header */}
          <header className="mb-6 text-left">
            <h1 className="text-4xl font-extrabold tracking-tight leading-snug mb-4">
              {selectedBlog?.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <Avatar>
                <AvatarImage
                  src={selectedBlog?.author?.photoUrl || ""}
                  alt="Author"
                />
                <AvatarFallback>NE</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {selectedBlog?.author?.firstName}{" "}
                  {selectedBlog?.author?.lastName}
                </p>
                <p className="text-xs">{selectedBlog?.author?.occupation}</p>
              </div>
              <span>• {changeTimeFormat(selectedBlog?.createdAt)}</span>
              <span>• 8 min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
            <img
              src={selectedBlog?.thumbnail}
              alt={selectedBlog?.title}
              className="w-full max-h-[350px] object-cover object-center"
            />
          </div>

          {/* Subtitle BELOW image */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {selectedBlog?.subtitle}
          </p>

          {/* Blog Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none mb-12 text-left"
            dangerouslySetInnerHTML={{ __html: selectedBlog?.description }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {selectedBlog?.tags?.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between border-y border-gray-200 dark:border-gray-700 py-4 mb-12">
            <div className="flex items-center gap-6">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                {liked ? (
                  <FaHeart size={20} className="text-red-600" />
                ) : (
                  <FaRegHeart size={20} className="hover:text-gray-600" />
                )}
                <span>{blogLike}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{comment.length} Comments</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comments */}
          <CommentBox selectedBlog={selectedBlog} />

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-6">Related Content</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel._id}
                    to={`/blogs/${rel._id}`}
                    className="bg-white dark:bg-gray-900 border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-40 object-cover object-center"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rel.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (reserved for future widgets/ads/etc.) */}
        <div className="hidden lg:block flex-1">{/* Future section */}</div>
      </div>
    </div>
  )
}

export default BlogView
