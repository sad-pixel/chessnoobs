import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FeatureCard({ icon, title, description, link, comingSoon }: { icon: JSX.Element; title: string; description: string; link: string; comingSoon: boolean }) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-amber-800">{title}</h3>
            <p className="mt-2 text-base text-amber-700">{description}</p>
            {comingSoon ? (
                <Badge variant="secondary" className="mt-4">
                    Coming Soon
                </Badge>
            ) : (
                <Link href={link} className="w-full">
                    <Button 
                        className="mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors duration-300 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                        Try Now
                    </Button>
                </Link>
            )}
        </div>
    );
}