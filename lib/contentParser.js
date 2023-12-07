import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";
import { decodeCbor } from "./utils/cborparser";
import cbor from "cbor";

// get index page data, ex: _index.md
export const getListPage = async (filePath, apiUrl) => {
  let frontmatter, content, contentapi;
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/cbor",
        responsetype: "arraybuffer",
      },
    };

    // Simulate asynchronous data fetching (replace with your actual data fetching logic)
    const response = await fetch(apiUrl, requestOptions);
    const cborDataAsString = await response.arrayBuffer();

    // const cborBuffer = Buffer.from(cborDataAsString, "base64");
    contentapi = await cbor.decode(cborDataAsString);

    // console.log("Decoded CBOR data:", contentapi.data);
  } catch (error) {
    console.error("Error fetching or decoding CBOR:", error);
  }

  const pageData = fs.readFileSync(path.join(filePath), "utf-8");
  const pageDataParsed = matter(pageData);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
    contentapi,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = async (apiUrl) => {
  if (apiUrl === "content")  {
    const filesPath = fs.readdirSync(path.join(folder));
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );
  } else {
    let contentapi;
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/cbor",
        responsetype: "arraybuffer",
      },
    };

    // Simulate asynchronous data fetching (replace with your actual data fetching logic)
    const response = await fetch(apiUrl, requestOptions);
    const cborDataAsString = await response.arrayBuffer();

    // const cborBuffer = Buffer.from(cborDataAsString, "base64");
    contentapi = await cbor.decode(cborDataAsString);

    // console.log("Decoded CBOR data:", contentapi.data);
  } catch (error) {
    console.error("Error fetching or decoding CBOR:", error);
  }

  return contentapi;
  }
  

  
  // return filterByDate;
};

// get regular page data, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedPages = getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
