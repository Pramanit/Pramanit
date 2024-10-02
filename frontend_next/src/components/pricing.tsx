'use client'

import { useState } from 'react'

interface PricingTabProps {
  popular?: boolean
  planName: string
  price?: { // Made price optional for Enterprise
    monthly?: number
    yearly?: number
    eventPrice?: number
  }
  planDescription: string
  features?: string[] 
}

export function PricingTab(props: PricingTabProps) {
  return (
    <div id="pricing">
      <div className={`h-full`}>
        <div className="relative flex flex-col h-full p-6 rounded-2xl bg-black border border-white/30 shadow shadow-black/80">
          {props.popular && (
            <div className="absolute top-0 right-0 mr-6 -mt-4">
              <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">Most Popular</div>
            </div>
          )}
          <div className="mb-5">
            <div className="text-white/70 font-semibold mb-1">{props.planName}</div>
            <div className="inline-flex items-baseline mb-2">
              {props.planName === "Perform" && (
                <>
                  <span className="text-white/70 font-bold text-4xl">$</span>
                  <span className="text-white/50 font-bold text-4xl">
                    {props.price?.eventPrice}
                  </span>
                  <span className="text-white/70 font-medium">/event</span>
                </>
              )}
              {props.planName === "FREE" && (
                <>
                  <span className="text-white/70 font-bold text-4xl">$</span>
                  <span className="text-white/50 font-bold text-4xl">0*</span>
                  <span className="text-white/70 font-medium">/mo</span>
                </>
              )}
              {props.planName === "Enterprise" && (
                <span className="text-white/50 text-lg">Contact for pricing</span>
              )}
            </div>
            <div className="text-sm text-white/70 mb-5">{props.planDescription}</div>
            {props.planName === "FREE" && (
              <div className="text-xs text-white/70 ml-20 mb-1">*$10 For Bluetick Verification.</div>
            )}
            {props.planName === "Enterprise" ? (
              <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#2C38A8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-[#2C36A3] focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150" href="#contact">
                Contact Us
              </a>
            ) : (
              <a className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#2C38A8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-[#2C36A3] focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                Purchase Plan
              </a>
            )}
          </div>
          {props.features && (
            <>
              <div className="text-slate-200 font-medium mb-3">Includes:</div>
              <ul className="text-slate-400 text-sm space-y-3 grow">
                {props.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PricingTable() {
  return (
    <div>
      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">

        {/* Pricing tab 1 */}
        <PricingTab
          planName="FREE"
          price={{ monthly: 0, yearly: 0 }}
          planDescription="Individuals or small organizations looking for basic verification services."
          features={[
            'Basic certificate verification (up to a certain number of verifications per month)',
            'Email support',
            'Basic customization options',
          ]} />

        {/* Pricing tab 2 */}
        <PricingTab
          popular={true}
          planName="Perform"
          price={{ eventPrice: 100 }} // Changed to event price
          planDescription="Medium-sized organizations that require more advanced features and greater usage."
          features={[
            'Blue Tick Verification',
            'Certificate Design',
            'Download Certificate as PDF',
            'Increased verification limit per month',
            'Priority email support',
            'Advanced analytics and reporting',
            'Multi-user access',
            'Everything in the Essential Plan',
          ]} />

        {/* Pricing tab 3 */}
        <PricingTab
          planName="Enterprise"
          planDescription="Large organizations or institutions that require extensive features and support." 
          features={[
            'Fully Customizes Everything in the Essential Plan',
          ]} />

      </div>
    </div>
  )
}
