import React from "react";



interface AlertInfoProps {
    title: string;
    children: React.ReactNode;
}

interface AlertWarningProps {
    title: string;
    children: React.ReactNode;
}

export default function AlertInfo({ title, children }: AlertInfoProps) {
    return(
        <div>
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">{title}</p>
                <p>{children}</p>
            </div>
        </div>
    )
}

export function AlertWarning({ title, children }: AlertWarningProps) {
    return(
        <div>
            <div className="bg-yellow-100 border-t border-b border-yellow-500 text-yellow-700 px-4 py-3" role="alert">
                <p className="font-bold">{title}</p>
                <p>{children}</p>
            </div>
        </div>
    )
}