import { AudioPlayer } from "@/components/AudioPlayer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { InMemoryModal } from "@/components/InMemoryModal";

const Index = () => {
  const location = useLocation();
  const [showInMemoryModal, setShowInMemoryModal] = useState(true);
  
  useEffect(() => {
    // Check if we're on a modal route and open the corresponding modal
    const path = location.pathname;
    if (path !== '/' && !path.includes('/track/')) {
      // Extract the page slug from the path
      const pageSlug = path.substring(1); // Remove the leading slash
      
      // Dispatch a custom event to open the modal
      const event = new CustomEvent('openNavigationModal', { 
        detail: { pageSlug } 
      });
      window.dispatchEvent(event);
    }
  }, [location.pathname]);

  return (
    <>
      <AudioPlayer />
      <InMemoryModal 
        isOpen={showInMemoryModal} 
        onClose={() => setShowInMemoryModal(false)} 
      />
    </>
  );
};

export default Index;
