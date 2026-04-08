import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../axiosConfig'
import { toast } from 'sonner';
import { setBlog } from '@/redux/blogSlice';

const UpdateBlog = () => {
    const editor = useRef(null);
    const [loading, setLoading] = useState(false);
    const [publish, setPublish] = useState(false);
    const [blogData, setBlogData] = useState({ title: '', subtitle: '', category: '' });
    const [content, setContent] = useState('');
    const [previewThumbnail, setPreviewThumbnail] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const params = useParams();
    const id = params.blogId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blog } = useSelector(store => store.blog);
    const selectBlog = blog.find(b => b._id === id);

    // Initialize blog data on mount
    useEffect(() => {
        if (selectBlog) {
            setBlogData({
                title: selectBlog.title || '',
                subtitle: selectBlog.subtitle || '',
                category: selectBlog.category || '',
            });
            setContent(selectBlog.description || '');
            setPreviewThumbnail(selectBlog.thumbnail || null);
            setPublish(selectBlog.isPublished);
        }
    }, [selectBlog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData(prev => ({ ...prev, [name]: value }));
    };

    const selectCategory = (value) => {
        setBlogData(prev => ({ ...prev, category: value }));
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewThumbnail(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const updateBlogHandler = async () => {
        try {
            setLoading(true);

            // Check required fields
            if (!blogData.title || !blogData.category) {
                toast.error("Title and category are required.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("subtitle", blogData.subtitle);
            formData.append("description", content);
            formData.append("category", blogData.category);
            if (thumbnailFile) formData.append("file", thumbnailFile);

            const res = await axios.put(
                `http://localhost:5000/api/v1/blog/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                // Update Redux store
                const updatedBlogData = blog.map(b => b._id === id ? res.data.blog : b);
                dispatch(setBlog(updatedBlogData));
            }
        } catch (error) {
            console.error("Update Blog Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong while updating the blog.");
        } finally {
            setLoading(false);
        }
    };

    const togglePublishUnpublish = async () => {
        try {
            const action = publish ? "false" : "true";
            const res = await axios.patch(
                `http://localhost:5000/api/v1/blog/${id}?publish=${action}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                setPublish(!publish);
                toast.success(res.data.message);
            } else {
                toast.error("Failed to update publish status");
            }
        } catch (error) {
            console.error("Publish Toggle Error:", error.response?.data || error.message);
            toast.error("Something went wrong while toggling publish status");
        }
    };

    const deleteBlog = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/blog/delete/${id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                const updatedBlogData = blog.filter(b => b._id !== id);
                dispatch(setBlog(updatedBlogData));
                toast.success(res.data.message);
                navigate('/dashboard/your-blog');
            }
        } catch (error) {
            console.error("Delete Blog Error:", error.response?.data || error.message);
            toast.error("Something went wrong while deleting the blog");
        }
    };

    return (
        <div className='pb-10 px-3 pt-20 md:ml-[320px]'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-4">
                    <h1 className='text-4xl font-bold'>Update Blog</h1>
                    <p>Make changes to your blog and publish when ready.</p>

                    <div className="space-x-2">
                        <Button onClick={togglePublishUnpublish}>
                            {publish ? "UnPublish" : "Publish"}
                        </Button>
                        <Button variant="destructive" onClick={deleteBlog}>Remove Blog</Button>
                    </div>

                    <div>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter a title" name="title"
                            value={blogData.title} onChange={handleChange} className="dark:border-gray-300" />
                    </div>

                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" placeholder="Enter a subtitle" name="subtitle"
                            value={blogData.subtitle} onChange={handleChange} className="dark:border-gray-300" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={setContent}
                        />
                    </div>

                    <div>
                        <Label>Category</Label>
                        <Select onValueChange={selectCategory} value={blogData.category} className="dark:border-gray-300">
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Investment & Finance">Investment & Finance</SelectItem>
                                    <SelectItem value="Buying & Selling Guides">Buying & Selling Guides</SelectItem>
                                    <SelectItem value="Market Trends & Analysis">Market Trends & Analysis</SelectItem>
                                    <SelectItem value="Home Design & Renovation">Home Design & Renovation</SelectItem>
                                    <SelectItem value="Legal & Regulatory">Legal & Regulatory</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Thumbnail</Label>
                        <Input type="file" onChange={selectThumbnail} accept="image/*" />
                        {previewThumbnail && (
                            <img src={previewThumbnail} alt="Blog Thumbnail" className="w-64 my-2" />
                        )}
                    </div>

                    <div className='flex gap-3'>
                        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                        <Button onClick={updateBlogHandler}>
                            {loading ? "Please Wait..." : "Save"}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UpdateBlog;
