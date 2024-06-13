"use client";

import { userScore } from "@/utils/types";
import React from "react";
import Image from 'next/image'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.css';

export default function LeaderboardTable(  { scores } : { scores: userScore[] } ) {
    
    // get crown emoji
    const crown = <Image
                    src="/leaderboard-crown.png"
                    width={30}
                    height={30}
                    alt="crown"
                />

    // add crown emoji next to first guy's username
    scores = scores.map( (score, _) =>  _ == 0 ? 
    { 'username': <div className="flex flex-row space-x-1">{crown}<span className="max-w-32 truncate"> {score.username} </span></div> , 'total_xp': score.total_xp }  : 
    { 'username': score.username, 'total_xp': score.total_xp })
    
    return(
        <div className="flex flex-col text-center justify-center w-full">
            Leaderboard:
            <div className="flex flex-col my-5 py-2 max-w-full ">
                <div className="z-0 max-w-full ">
                    {scores.length == 0 ? 'Loading...' : 
                    <DataTable 
                    ptOptions={{ mergeSections: false }}
                    value={scores} tableStyle={{ minWidth: '20rem', maxWidth: '60rem', zIndex: 'z-0'}} 
                    showGridlines dataKey="username" selectionMode={'single'} 
                    metaKeySelection={false}
                    scrollable={false}>
                        <Column field="username" header="Username"></Column>
                        <Column field="total_xp" header="Score"></Column>
                    </DataTable>
                    }
                </div>
            </div>
        </div>
    )
}

