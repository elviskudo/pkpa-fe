import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const Breadcrumb = () =>{
    return(
        <nav className="top-0 flex justify-between items-center px-8 py-4 bg-gray-100 z-50 shadow-inner">
            <div className="flex items-center space-x-4">
                <Link className="underline-none text-blue-400" href="/">
                    Mata Kuliah
                </Link>
                <div><ChevronRightIcon className="size-6 text-black"/></div> 
                <Link
                    className="underline-none text-blue-400"
                    href="/material-ui/getting-started/installation/"
                >
                    Topik
                </Link>
                <div><ChevronRightIcon className="size-6 text-black"/></div> 
                <Link className="underline-none text-black" href="/" aria-current="page">
                    Judul Konten
                </Link>
            </div>
        </nav>
    );
}

export default Breadcrumb;