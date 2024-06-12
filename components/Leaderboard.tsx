"use client";

import { userScore } from "@/utils/types";
import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.css';


export default function LeaderboardTable(  { scores } : { scores: userScore[] } ) {
    
    return(
        <div className="flex flex-col text-center justify-center w-full">
            Leaderboard:
            <div className="flex flex-col my-5 py-2 max-w-full ">
                <div className="z-0 max-w-full ">
                    {scores.length == 0 ? 'Loading...' : 
                    <DataTable value={scores} tableStyle={{ minWidth: '20rem', maxWidth: '60rem', zIndex: 'z-0'}} 
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

