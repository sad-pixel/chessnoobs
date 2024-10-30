import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FeatureCard({ icon, title, description, link, comingSoon }: { icon: JSX.Element; title: string; description: string; link: string; comingSoon: boolean }) {
    return (
        <Link href={comingSoon ? "#" : link} className="w-full m-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-800">{title}</h3>
                <p className="mt-2 text-base text-amber-700">{description}</p>
                {comingSoon ? (
                    <Badge variant="secondary" className="mt-4">
                        Coming Soon
                    </Badge>
                ) : (
                    <Button 
                        className="mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                        Try Now
                    </Button>
                )}
            </div>
        </Link>
    );
}