import { MobileSidebar } from "@/components/navigation/mobile-sidebar";
import { Navbar } from "@/components/navigation/navbar";
import { Sidebar } from "@/components/navigation/sidebar";
import { RecommendationPanel } from "@/components/recommendations/recommendation-panel";
import { UserSuggestions } from "@/components/recommendations/user-suggestions";

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-full relative">
      <div className="h-full max-w-[1300px] mx-auto max-ms:flex max-ms:flex-col">
        <Navbar>
          <MobileSidebar />
        </Navbar>

        <div className="h-full flex items-start justify-center overflow-y-auto">
          <div className="sticky top-0 max-ms:hidden xl:max-w-[240px] xl:w-full w-fit h-screen border-r">
            <Sidebar />
          </div>

          <main className="w-full max-lg:max-w-[630px] min-h-full ms:border-r">
            {children}
          </main>

          <RecommendationPanel>
            <UserSuggestions />
          </RecommendationPanel>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
