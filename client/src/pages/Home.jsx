import React from "react";
import { useState, useEffect } from "react";
import { Loader, FormField, RenderCards } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div>
        <h2 className="font-bold text-2xl text-[#131313]">
          Community Showcase
        </h2>
        <p className="mt-2 text-sm max-w-[500px] text-[#7e7e96]">
          Discover a collection of imaginative and visually-stunning images
          generated using Cape.ai
        </p>
      </div>

      {/* Search Section */}
      <div className="mt-14">
        <FormField placeholder="Search something..." />
      </div>

      {/* Content Section */}
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="mt-2 text-[#131313] text-sm max-w-[500px]">
                Search results for:{" "}
                <span className="font-medium">{searchText}</span>
              </h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
              {searchText ? (
                <RenderCards data={[]} title="No search results" />
              ) : (
                <RenderCards data={[]} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
