import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { setBlog } from '@/redux/blogSlice'
import axiosInstance from '../axiosConfig'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateBlog = () => {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const { blog } = useSelector(store => store.blog)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createBlogHandler = async () => {
        if (!title || !category) {
            toast.error("Please enter title and select category");
            return;
        }
        try {
            setLoading(true);
            const res = await axiosInstance.post(`/blog/`, { title, category });
            if (res.data.success) {
                dispatch(setBlog([...blog, res.data.blog]));
                toast.success(res.data.message);
                navigate(`/dashboard/write-blog/${res.data.blog._id}`);
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Axios error:", error);
            toast.error("Failed to create blog. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20'>
            <Card className="md:p-10 p-4 dark:bg-gray-800">
                <h1 className='text-2xl font-bold'>Lets create blog</h1>
                <p>Write Your Blog Title below</p>
                <div className='mt-10'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            placeholder="Your Blog Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-white dark:bg-gray-700"
                        />
                    </div>
                    <div className='mt-4 mb-5'>
                        <Label>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
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
                    <div className='flex gap-2'>
                        <Button disabled={loading} onClick={createBlogHandler}>
                            {loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CreateBlog
