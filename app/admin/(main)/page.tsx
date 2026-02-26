import { AnalyticsSection } from "./_components/AnalyticSection"

export default function AdminPage() {
    return (
        <div className="min-w-full">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
            <AnalyticsSection />
        </div>
    )
}