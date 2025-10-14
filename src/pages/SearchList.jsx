import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCardList from '@/components/BlogCardList'; // ✅ use the same styled card

const SearchList = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const { blog } = useSelector(store => store.blog);

    const filteredBlogs = blog.filter(
        (blog) =>
            blog.title.toLowerCase().includes(query) ||
            blog.subtitle.toLowerCase().includes(query) ||
            blog.category.toLowerCase() === query.toLowerCase()
    );

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        <div
          className='pt-32'
          style={{ fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif` }}
        >
            <div className='max-w-7xl mx-auto'>
                <h2 className='mb-5 text-2xl md:text-3xl font-bold'>
                    Search Results for: "{query}"
                </h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((b) => (
                            <BlogCardList key={b._id} blog={b} />
                        ))
                    ) : (
                        <p className='text-center text-gray-500 col-span-full'>
                            No blogs found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchList;
