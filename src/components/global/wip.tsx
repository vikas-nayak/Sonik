'use client'

import React from 'react'
import { Construction } from 'lucide-react'

export default function WorkInProgressPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col">
            <div className="text-center space-y-6">
                <div className="relative">
                    <Construction className="w-24 h-24 text-yellow-200 mx-auto " />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-blue-600">Work in Progress</h1>
                <p className="text-xl md:text-2xl font-bold text-blue-600">
                    I am currently building this part of the site. Check back soon!
                </p>
            </div>
        </div>
    )
}