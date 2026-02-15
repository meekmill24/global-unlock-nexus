import { Smartphone, Server, Wifi, FileText } from "lucide-react";

export interface ServiceItem {
  name: string;
  group: string;
  price: number;
  delivery: string;
  tag?: string;
}

export const serviceData: Record<string, { title: string; icon: typeof Smartphone; services: ServiceItem[] }> = {
  imei: {
    title: "Place A New IMEI Order",
    icon: Smartphone,
    services: [
      // ═══════════════════════════════════════════════════════════
      // A12+ iCloud Bypass – No Signal [Offer Tools]
      // ═══════════════════════════════════════════════════════════
      { name: "HFZ Activator Premium - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 4.20, delivery: "1-5 Minutes", tag: "HOT" },
      { name: "IHello HFZ AiO Premium - A12+ CH Supported iCloud Bypass iOS 18–26.1 [All Models - No Signal] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 4.20, delivery: "1-5 Minutes" },
      { name: "SMD Activator PRO - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 4.50, delivery: "1-5 Minutes" },
      { name: "iRemove Tool - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Mac & Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 4.20, delivery: "1-5 Minutes" },
      { name: "LU-WIFI - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.50, delivery: "1-5 Minutes", tag: "LOW" },
      { name: "iRemoval Pro Premium - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 7.55, delivery: "1-5 Minutes" },
      { name: "i-Activator - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 2.40, delivery: "1-5 Minutes" },
      { name: "Aldaz - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 5.39, delivery: "1-5 Minutes" },
      { name: "iKeyPro - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.20, delivery: "1-5 Minutes", tag: "LOW" },
      { name: "iAPro - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.00, delivery: "1-5 Minutes", tag: "LOW" },
      { name: "FMI-OFF PRO - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.49, delivery: "1-5 Minutes" },
      { name: "CTG - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.39, delivery: "1-5 Minutes" },
      { name: "FRPFILE - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 4.56, delivery: "1-5 Minutes" },
      { name: "Otix Activator Premium - A12+ iCloud Bypass iOS 18–26.1 [With iCloud Services] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 5.10, delivery: "1-5 Minutes" },
      { name: "Otix Activator - A12+ iCloud Bypass iOS 18–26.1 [Without iCloud Services] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 2.40, delivery: "1-5 Minutes" },
      { name: "Otix Activator - A12+ iOS 26 [iPhone 17 Series - No Signal] Mac", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 2.64, delivery: "1-5 Minutes", tag: "NEW" },
      { name: "Zeus - A12+ iCloud Bypass iOS 18–26.1 [iPhones - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.80, delivery: "1-5 Minutes" },
      { name: "Zeus - A12+ iCloud Bypass iOS 18–26.1 [iPads - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 1.80, delivery: "1-5 Minutes" },
      { name: "UAG - A12+ iCloud Bypass iOS 18–26.1 [All Models - No Signal] Windows", group: "A12+ iCloud Bypass No Signal [Offer Tools]", price: 2.40, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // A12+ iCloud Bypass – No Signal – Cheap
      // ═══════════════════════════════════════════════════════════
      { name: "A12+ iCloud Lock Bypass iPad All Series - No Signal [Windows]", group: "A12+ iCloud Bypass No Signal – Cheap", price: 1.25, delivery: "1-5 Minutes", tag: "LOW" },
      { name: "A12+ iCloud Lock Bypass iPhone Xs–11 Series - No Signal [Windows]", group: "A12+ iCloud Bypass No Signal – Cheap", price: 1.25, delivery: "1-5 Minutes", tag: "LOW" },
      { name: "A12+ iCloud Lock Bypass iPhone 12–17 Series - No Signal [Windows]", group: "A12+ iCloud Bypass No Signal – Cheap", price: 1.25, delivery: "1-5 Minutes", tag: "LOW" },

      // ═══════════════════════════════════════════════════════════
      // Samsung FRP Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung FRP Tool | Google Account Unlock | Android 16 Only", group: "Samsung FRP Tool", price: 1.20, delivery: "1-5 Minutes", tag: "NEW" },

      // ═══════════════════════════════════════════════════════════
      // T-Mobile | Sprint | Metro PCS USA iPhone Factory Unlock
      // ═══════════════════════════════════════════════════════════
      { name: "USA T-Mobile All iPhone Till 17 Series Premium 100% [Express 1-6hrs]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 84.00, delivery: "1-6 Hours", tag: "HOT" },
      { name: "T-Mobile USA All iPhone Till XS/XR/XS MAX [Clean | Paid Off | Eligible]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 30.50, delivery: "1-48 Hours" },
      { name: "T-Mobile USA All iPhone 11 & 12 Series [Clean | Paid Off | Eligible]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 30.50, delivery: "1-48 Hours" },
      { name: "T-Mobile USA All iPhone 13 & 14 Series [Clean | Paid Off | Eligible]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 49.50, delivery: "1-48 Hours" },
      { name: "T-Mobile USA All iPhone 15 & 16 Series [Clean | Paid Off | Eligible]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 60.00, delivery: "1-48 Hours" },
      { name: "T-Mobile USA All iPhone Till 17 Series [Clean | Paid Off | Eligible]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 70.00, delivery: "1-48 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 6–14 Pro Max [Clean & Finance | Blacklisted]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 135.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 15 | 15 Plus [Clean & Finance | Blacklisted]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 162.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 16 | 16 Plus | 16e [Blacklisted Supported]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 191.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 16 Pro | 16 Pro Max [Blacklisted]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 84.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 17 Pro [Blacklisted Supported]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 205.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 17 Air [Blacklisted Supported]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 84.00, delivery: "1-6 Hours" },
      { name: "T-Mobile | Sprint | Metro PCS iPhone 17 Pro Max [Blacklisted Supported]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 205.00, delivery: "1-6 Hours" },
      { name: "Sprint To T-Mobile iPhone 13–14 Series [Eligible Only]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 32.50, delivery: "1-7 Days" },
      { name: "Sprint To T-Mobile iPhone 11–12 Series [Eligible Only]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 27.50, delivery: "1-7 Days" },
      { name: "Sprint To T-Mobile iPhone 4–XS [Eligible Only]", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 22.50, delivery: "1-7 Days" },
      { name: "T-Mobile USA iPhone & Generic Fully Paid Eligibility Check", group: "T-Mobile | Sprint | Metro PCS USA iPhone Unlock", price: 0.56, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Huawei | Honor FRP & Unlock Code
      // ═══════════════════════════════════════════════════════════
      { name: "Honor Worldwide [FRP Code by Serial] Fast", group: "Huawei | Honor FRP & Unlock", price: 27.50, delivery: "1-12 Hours" },
      { name: "Honor Worldwide [FRP KEY] By Serial [Limited Slots]", group: "Huawei | Honor FRP & Unlock", price: 23.50, delivery: "1-48 Hours" },
      { name: "Honor Central Asian Countries [FRP KEY] By Serial", group: "Huawei | Honor FRP & Unlock", price: 16.00, delivery: "12-72 Hours" },
      { name: "Honor Worldwide [FRP Code by Serial] INSTANT", group: "Huawei | Honor FRP & Unlock", price: 47.49, delivery: "Instant", tag: "FAST" },
      { name: "Huawei AT&T | Nextel | Lusacell Unlock Code [NCK Only]", group: "Huawei | Honor FRP & Unlock", price: 6.00, delivery: "1-24 Hours" },
      { name: "Huawei Worldwide Factory Code [NCK Only] [Exclusive]", group: "Huawei | Honor FRP & Unlock", price: 27.50, delivery: "1-10 Days" },

      // ═══════════════════════════════════════════════════════════
      // Tecno | Infinix | Itel MDM Lock Removal
      // ═══════════════════════════════════════════════════════════
      { name: "Tecno | Infinix MDM Official Unlock By IMEI + Lock Screen Pic [Fast]", group: "Tecno | Infinix | Itel MDM Removal", price: 22.50, delivery: "1-48 Hours" },
      { name: "Tecno | Infinix MDM Unlock [Rejected IMEIs from Normal Service]", group: "Tecno | Infinix | Itel MDM Removal", price: 28.00, delivery: "1-3 Days" },
      { name: "Tecno | Infinix MDM Unlock By IMEI + Customer ID + Proof of Purchase", group: "Tecno | Infinix | Itel MDM Removal", price: 17.50, delivery: "1-24 Hours" },
      { name: "Tecno | Infinix ID Lock Official Removal", group: "Tecno | Infinix | Itel MDM Removal", price: 9.60, delivery: "1-6 Hours" },

      // ═══════════════════════════════════════════════════════════
      // iCloud Remove Worldwide – Clean Only 100%
      // ═══════════════════════════════════════════════════════════
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 12/12 Mini", group: "iCloud Remove Worldwide – Clean 100%", price: 178.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 12 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 198.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 12 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 203.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 13", group: "iCloud Remove Worldwide – Clean 100%", price: 213.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 13 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 238.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 13 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 243.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 14", group: "iCloud Remove Worldwide – Clean 100%", price: 258.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 14 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 278.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 14 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 283.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 15", group: "iCloud Remove Worldwide – Clean 100%", price: 288.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 15 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 313.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 15 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 318.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 16/16e", group: "iCloud Remove Worldwide – Clean 100%", price: 343.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 16 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 373.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 16 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 378.00, delivery: "12-72 Hours" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 17", group: "iCloud Remove Worldwide – Clean 100%", price: 488.00, delivery: "12-72 Hours", tag: "NEW" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 17 Pro", group: "iCloud Remove Worldwide – Clean 100%", price: 523.00, delivery: "12-72 Hours", tag: "NEW" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 17 Pro Max", group: "iCloud Remove Worldwide – Clean 100%", price: 535.00, delivery: "12-72 Hours", tag: "NEW" },
      { name: "iCloud Remove Clean Worldwide | 100% FMI OFF iPhone 17 Air", group: "iCloud Remove Worldwide – Clean 100%", price: 495.00, delivery: "12-72 Hours", tag: "NEW" },

      // ═══════════════════════════════════════════════════════════
      // OTIX A12+ iCloud Bypass With Signal – iOS 15.0 to 16.6.1
      // ═══════════════════════════════════════════════════════════
      { name: "OTIX A12+ With Signal | iPhone 11 | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 25.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 11 Pro | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 30.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 11 Pro Max | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 35.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 12 | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 40.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 12 Mini | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 30.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 12 Pro | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 45.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 12 Pro Max | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 50.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 13 | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 55.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 13 Mini | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 35.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 13 Pro | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 60.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 13 Pro Max | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 55.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 14 | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 70.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 14 Pro | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 75.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone 14 Pro Max | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 80.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone SE 2nd/3rd Gen | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 20.00, delivery: "1-5 Minutes" },
      { name: "OTIX A12+ With Signal | iPhone XR | XS | XS Max | iOS 15.0–16.6.1", group: "OTIX A12+ iCloud Bypass With Signal", price: 20.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // IMEI Info Checks
      // ═══════════════════════════════════════════════════════════
      { name: "iPhone & iPad Carrier | SIMLock Check By IMEI/SN", group: "IMEI Info Checks", price: 0.54, delivery: "Instant" },
      { name: "iPhone & iPad Full Carrier | Warranty | FMI | US Blacklist Check", group: "IMEI Info Checks", price: 0.53, delivery: "Instant" },
      { name: "Samsung Knox Guard [KG] Enrollment Status Check", group: "IMEI Info Checks", price: 0.59, delivery: "1-5 Minutes" },
      { name: "Convert iPhone IMEI1/IMEI2 to SN | SN to IMEI", group: "IMEI Info Checks", price: 0.52, delivery: "1-5 Minutes" },
      { name: "Apple Identification Report – Carrier | Blacklist | Replacement Check", group: "IMEI Info Checks", price: 0.67, delivery: "1-5 Minutes" },
      { name: "Apple ID Pro Report – Warranty | Carrier | GSMA | iCloud | MDM Check", group: "IMEI Info Checks", price: 1.13, delivery: "1-5 Minutes" },
      { name: "Apple Worldwide Block & Blacklist Checker", group: "IMEI Info Checks", price: 0.52, delivery: "Instant" },
      { name: "Apple iOS MDM Lock Check By IMEI", group: "IMEI Info Checks", price: 0.75, delivery: "1-5 Minutes" },
      { name: "Samsung Full Info | Carrier | Warranty Checker", group: "IMEI Info Checks", price: 0.55, delivery: "Instant" },
      { name: "Google Pixel Warranty | Carrier Check By IMEI", group: "IMEI Info Checks", price: 0.59, delivery: "1-5 Minutes" },
      { name: "Huawei Full Info | Carrier | Warranty Checker", group: "IMEI Info Checks", price: 0.58, delivery: "Instant" },
      { name: "LG Full Info | Warranty Checker", group: "IMEI Info Checks", price: 0.53, delivery: "Instant" },
      { name: "Motorola Warranty | Full Info Check By IMEI", group: "IMEI Info Checks", price: 0.55, delivery: "Instant" },
      { name: "USA T-Mobile Pro Status Check [Clean | Lost | Stolen | Blocked]", group: "IMEI Info Checks", price: 0.54, delivery: "1-5 Minutes" },
      { name: "Verizon USA [Clean | Blocked | Unpaid] Status Check", group: "IMEI Info Checks", price: 0.55, delivery: "Instant" },
      { name: "WorldWide GSMA Blacklisted Check By IMEI", group: "IMEI Info Checks", price: 0.52, delivery: "Instant" },

      // ═══════════════════════════════════════════════════════════
      // iCloud & GSX Checks
      // ═══════════════════════════════════════════════════════════
      { name: "Apple Find My iPhone | Activation Lock Check By IMEI", group: "iCloud & GSX Checks", price: 0.51, delivery: "Instant" },
      { name: "Apple Find My iPhone | Activation Lock Check By SN", group: "iCloud & GSX Checks", price: 0.51, delivery: "1-5 Minutes" },
      { name: "Apple Full GSX Report Check By IMEI/SN", group: "iCloud & GSX Checks", price: 2.35, delivery: "1-5 Minutes" },
      { name: "Apple iCloud Lost | Clean Checker By IMEI", group: "iCloud & GSX Checks", price: 0.52, delivery: "Instant" },
      { name: "Apple Sold By | Coverage Check + Case & Replacement History", group: "iCloud & GSX Checks", price: 1.98, delivery: "1-5 Minutes" },
      { name: "MacBook | iMac iCloud Find My Mac ON & OFF Check", group: "iCloud & GSX Checks", price: 0.58, delivery: "1-5 Minutes" },
      { name: "MacBook | MacOS iCloud Clean & Lost Status Checker", group: "iCloud & GSX Checks", price: 0.68, delivery: "1-5 Minutes" },
      { name: "Full GSX Report [Sold By | Case + Replacement History | WiFi MAC]", group: "iCloud & GSX Checks", price: 2.40, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // iHello HFZ AIO Tool
      // ═══════════════════════════════════════════════════════════
      { name: "iHello HFZ AiO Premium | iPads 2017 Mini 4/Air 2/Pro 1 WiFi", group: "iHello HFZ AIO Tool", price: 3.60, delivery: "1-5 Minutes" },
      { name: "iHello HFZ AiO Premium | iPads 2018 (5th/6th/7th/Pro) WiFi", group: "iHello HFZ AIO Tool", price: 2.40, delivery: "1-5 Minutes" },
      { name: "iHello HFZ AiO Premium | iPhone Passcode Bypass 5s/6/6 Plus", group: "iHello HFZ AIO Tool", price: 1.80, delivery: "1-5 Minutes" },
      { name: "iHello HFZ AiO Premium | iPhone Passcode Bypass 6s–X", group: "iHello HFZ AIO Tool", price: 3.60, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // iAPro Tool
      // ═══════════════════════════════════════════════════════════
      { name: "iAPro A5 iCloud Bypass | 4, 4S, Touch 5, Mini 1, iPad 2/3 Windows", group: "iAPro Tool", price: 1.00, delivery: "1-5 Minutes" },
      { name: "iAPro Mac T2 MDM Permanent Removal", group: "iAPro Tool", price: 2.40, delivery: "1-5 Minutes" },
      { name: "iAPro Ramdisk | Hello | Passcode-Disable | iOS 15/16/17", group: "iAPro Tool", price: 1.00, delivery: "1-5 Minutes" },
      { name: "iAPro T2 MAC Untethered iCloud Bypass for MacOS BridgeOS 9.X", group: "iAPro Tool", price: 3.60, delivery: "1-5 Minutes" },
      { name: "MDM Bypass iPhones | iPads | All iOS by iAPro Tool", group: "iAPro Tool", price: 0.80, delivery: "1-5 Minutes", tag: "LOW" },

      // ═══════════════════════════════════════════════════════════
      // Aldaz Tool
      // ═══════════════════════════════════════════════════════════
      { name: "iAldaz Premium Bypass A6 Ramdisk", group: "Aldaz Tool", price: 2.82, delivery: "1-5 Minutes" },
      { name: "Aldaz Open Menu Hide iCloud & Remove Screen Time A12+ All Models", group: "Aldaz Tool", price: 3.42, delivery: "1-5 Minutes" },
      { name: "Aldaz Premium Bypass A5 Hello Screen Untethered [MacOS]", group: "Aldaz Tool", price: 2.39, delivery: "1-5 Minutes" },
      { name: "Aldaz Premium Bypass CHECKM8 - 6s–X [No Network]", group: "Aldaz Tool", price: 2.82, delivery: "1-5 Minutes" },
      { name: "Aldaz Premium Bypass MDM - All Models iPhone | iPad", group: "Aldaz Tool", price: 3.42, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // UAG Bypass Tools (Windows)
      // ═══════════════════════════════════════════════════════════
      { name: "UAG A5 Activator | iPhone 4/4S - iPod Touch 5 - iPad Mini 1/2/3", group: "UAG Bypass Tools", price: 1.20, delivery: "1-5 Minutes" },
      { name: "UAG Hello Screen WiFi Untethered Bypass No Signal A7/A11", group: "UAG Bypass Tools", price: 1.00, delivery: "1-5 Minutes" },
      { name: "UAG MDM Bypass iPhone / iPad", group: "UAG Bypass Tools", price: 1.00, delivery: "1-5 Minutes" },
      { name: "UAG Ramdisk | Hello-Passcode-Disable | iOS 15/16/17", group: "UAG Bypass Tools", price: 3.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Add IMEI To GSMA Blacklist
      // ═══════════════════════════════════════════════════════════
      { name: "ADD IMEI TO GSMA Blacklist Database | Report Stolen", group: "GSMA Blacklist Services", price: 4.40, delivery: "1-5 Minutes" },
    ],
  },

  server: {
    title: "Place A New Server Order",
    icon: Server,
    services: [
      // ═══════════════════════════════════════════════════════════
      // Chimera Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Chimera License", group: "Chimera Tool", price: 99.90, delivery: "Instant" },
      { name: "Chimera Tool Credit", group: "Chimera Tool", price: 0.098, delivery: "Instant" },

      // ═══════════════════════════════════════════════════════════
      // Global Unlocker Pro
      // ═══════════════════════════════════════════════════════════
      { name: "Global Unlocker 1 Year Activation [New Users]", group: "Global Unlocker Pro", price: 79.80, delivery: "1-5 Minutes" },
      { name: "Global Unlocker 1 Year Renewal [Existing Users]", group: "Global Unlocker Pro", price: 77.49, delivery: "1-5 Minutes" },
      { name: "Global Unlocker Pro Credits [New User]", group: "Global Unlocker Pro", price: 0.825, delivery: "1-5 Minutes" },
      { name: "Global Unlocker Pro Credits [Existing User]", group: "Global Unlocker Pro", price: 0.825, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Griffin Unlock Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Griffin Unlock Tool 12 Months [Renew Existing]", group: "Griffin Unlock Tool", price: 48.09, delivery: "1-5 Minutes" },
      { name: "Griffin Unlock Tool 12 Months [New Users]", group: "Griffin Unlock Tool", price: 48.59, delivery: "1-10 Minutes" },
      { name: "Griffin Unlock Tool 6 Months [Renew Existing]", group: "Griffin Unlock Tool", price: 38.19, delivery: "1-5 Minutes" },
      { name: "Griffin Unlock Tool 6 Months [New Users]", group: "Griffin Unlock Tool", price: 38.19, delivery: "1-5 Minutes" },
      { name: "Griffin Unlock Tool 3 Months [New Users]", group: "Griffin Unlock Tool", price: 28.19, delivery: "1-5 Minutes" },
      { name: "Griffin-Unlocker Create New Account 2 Years + Premium Pack", group: "Griffin Unlock Tool", price: 105.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Cheetah Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Cheetah [LG] Tool Activation - 1 Year", group: "Cheetah Tool", price: 14.99, delivery: "1-5 Minutes" },
      { name: "Cheetah Tool Credit Any Quantity", group: "Cheetah Tool", price: 0.74, delivery: "1-5 Minutes" },
      { name: "Cheetah Tool Pro Activation - 1 Year", group: "Cheetah Tool", price: 47.29, delivery: "Instant" },
      { name: "Cheetah Tool Pro Activation [3 Months]", group: "Cheetah Tool", price: 24.52, delivery: "1-5 Minutes" },
      { name: "Cheetah Tool Pro Activation [6 Months]", group: "Cheetah Tool", price: 35.48, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Sigma Plus License
      // ═══════════════════════════════════════════════════════════
      { name: "Sigma Plus 1 Year Activation [Box or Dongle]", group: "Sigma Plus License", price: 58.65, delivery: "1-5 Minutes" },
      { name: "Sigma Plus 6 Month Activation [Box or Dongle]", group: "Sigma Plus License", price: 43.65, delivery: "1-5 Minutes" },
      { name: "Sigma Plus 3 Months Digital License [NO Box]", group: "Sigma Plus License", price: 59.99, delivery: "1-5 Minutes" },
      { name: "Sigma Plus 1 Month Digital License [NO Box]", group: "Sigma Plus License", price: 34.50, delivery: "1-5 Minutes" },
      { name: "Sigma Plus 3 Days Digital License [NO Box]", group: "Sigma Plus License", price: 9.30, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Z3X Box & Pandora Box Activations
      // ═══════════════════════════════════════════════════════════
      { name: "Z3x Samsung Tool Activation", group: "Z3X & Pandora Box", price: 57.20, delivery: "1-5 Minutes" },
      { name: "Z3x Samsung Pro Update", group: "Z3X & Pandora Box", price: 55.50, delivery: "1-5 Minutes" },
      { name: "Z3x LG Tool Activation", group: "Z3X & Pandora Box", price: 57.20, delivery: "1-5 Minutes" },
      { name: "Activate Pandora On Z3X Box [1 Year]", group: "Z3X & Pandora Box", price: 70.49, delivery: "1-10 Minutes" },
      { name: "Z3X SamsTool Online Activation Without Box [1 Year 1 PC]", group: "Z3X & Pandora Box", price: 52.90, delivery: "1-5 Minutes" },
      { name: "Z3X | Pandora | SamsTool Refill Credits", group: "Z3X & Pandora Box", price: 0.13, delivery: "1-5 Minutes" },
      { name: "Z3X | Pandora | SamsTool Unlock Credits [30 Pack]", group: "Z3X & Pandora Box", price: 33.90, delivery: "Instant" },
      { name: "Z3X | Pandora | SamsTool Unlock Credits [100 Pack]", group: "Z3X & Pandora Box", price: 113.50, delivery: "1-10 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // UnlockTool Activation
      // ═══════════════════════════════════════════════════════════
      { name: "UnlockTool Activation | Renewal [12 Months]", group: "UnlockTool", price: 42.30, delivery: "1-5 Minutes", tag: "HOT" },
      { name: "UnlockTool Activation | Renewal [6 Months]", group: "UnlockTool", price: 25.85, delivery: "1-5 Minutes" },
      { name: "UnlockTool Activation | Renewal [3 Months]", group: "UnlockTool", price: 17.05, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Octoplus / Octopus Activation
      // ═══════════════════════════════════════════════════════════
      { name: "Octoplus FRP 1 Year Digital License [Without Box]", group: "Octoplus | Octopus", price: 53.23, delivery: "1-5 Minutes" },
      { name: "Octoplus FRP 6 Months Digital License [Without Box]", group: "Octoplus | Octopus", price: 48.50, delivery: "1-5 Minutes" },
      { name: "Octoplus FRP 3 Month Digital License [Without Box]", group: "Octoplus | Octopus", price: 26.90, delivery: "1-5 Minutes" },
      { name: "Octoplus Full 1 Year Digital License [Without Box]", group: "Octoplus | Octopus", price: 113.99, delivery: "1-5 Minutes" },
      { name: "Octoplus Samsung 1 Year Digital License [Without Box]", group: "Octoplus | Octopus", price: 72.00, delivery: "1-5 Minutes" },
      { name: "Octoplus Huawei 1 Year Digital License [Without Box]", group: "Octoplus | Octopus", price: 52.90, delivery: "1-5 Minutes" },
      { name: "Octoplus LG 1 Year Digital License [Without Box]", group: "Octoplus | Octopus", price: 51.99, delivery: "1-5 Minutes" },
      { name: "Octopus/Octoplus Server Credits", group: "Octoplus | Octopus", price: 0.11, delivery: "1-10 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // TFM Tool Pro
      // ═══════════════════════════════════════════════════════════
      { name: "TFM Tool Pro Activation [1 Year]", group: "TFM Tool Pro", price: 28.99, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro Activation [2 Years]", group: "TFM Tool Pro", price: 46.99, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro Activation [3 Months]", group: "TFM Tool Pro", price: 20.54, delivery: "1-5 Minutes" },
      { name: "TFM Tool Pro Credit [Must Have Activation]", group: "TFM Tool Pro", price: 0.99, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // EFT Activation
      // ═══════════════════════════════════════════════════════════
      { name: "EFT Pro 1 Year Activation [Without Dongle] New User", group: "EFT Activation", price: 54.20, delivery: "1-5 Minutes" },
      { name: "EFT Pro 1 Year Renewal [Without Dongle] Existing User", group: "EFT Activation", price: 33.77, delivery: "1-5 Minutes" },
      { name: "EFT Pro Tool 6 Months [No Need Dongle]", group: "EFT Activation", price: 38.99, delivery: "1-5 Minutes" },
      { name: "EFT Pro Tool 3 Months [No Need Dongle]", group: "EFT Activation", price: 23.50, delivery: "1-5 Minutes" },
      { name: "EFT Pro Tool 1 Month [No Need Dongle]", group: "EFT Activation", price: 10.99, delivery: "1-5 Minutes" },
      { name: "EFT Dongle One Year Plan", group: "EFT Activation", price: 23.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // SamKey
      // ═══════════════════════════════════════════════════════════
      { name: "SamKey [Samsung Unlock Accounts Credits]", group: "SamKey", price: 1.45, delivery: "1-10 Minutes" },
      { name: "SamKey TMO / SPR / MTK Special Credits", group: "SamKey", price: 30.80, delivery: "Instant" },

      // ═══════════════════════════════════════════════════════════
      // Android Multi Tool [AMT]
      // ═══════════════════════════════════════════════════════════
      { name: "AMT Android Multi Tool Credits", group: "Android Multi Tool [AMT]", price: 0.99, delivery: "1-5 Minutes" },
      { name: "Android Multi Tool - 1 Year AMT", group: "Android Multi Tool [AMT]", price: 27.80, delivery: "1-5 Minutes" },
      { name: "Android Multi Tool - 6 Months AMT", group: "Android Multi Tool [AMT]", price: 16.90, delivery: "1-5 Minutes" },
      { name: "Android Multi Tool - 3 Months AMT", group: "Android Multi Tool [AMT]", price: 9.90, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Fenix Utility Pro
      // ═══════════════════════════════════════════════════════════
      { name: "Fenix Utility Pro Activation [1 Year 1 PC]", group: "Fenix Utility Pro", price: 43.00, delivery: "1-5 Minutes" },
      { name: "Fenix Utility Pro Activation [1 Month 1 PC]", group: "Fenix Utility Pro", price: 14.50, delivery: "1-5 Minutes" },
      { name: "Fenix Utility Pro Credits [KG | MDM | PayJoy | IMEI Fix]", group: "Fenix Utility Pro", price: 0.94, delivery: "1-5 Minutes" },
      { name: "Fenix Utility Pro Renewal [1 Year 1 PC]", group: "Fenix Utility Pro", price: 44.54, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // CF-Tools
      // ═══════════════════════════════════════════════════════════
      { name: "CF-Tools 12 Months Activation/Renewal", group: "CF-Tools", price: 22.17, delivery: "1-5 Minutes" },
      { name: "CF-Tools 6 Months Activation/Renewal", group: "CF-Tools", price: 15.02, delivery: "1-5 Minutes" },
      { name: "CF-Tools 3 Months Activation/Renewal", group: "CF-Tools", price: 9.12, delivery: "1-5 Minutes" },
      { name: "CF-Tools 1 Month Activation/Renewal", group: "CF-Tools", price: 4.68, delivery: "1-5 Minutes" },
      { name: "CF-Tools Credits", group: "CF-Tools", price: 1.02, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // TSM Tool
      // ═══════════════════════════════════════════════════════════
      { name: "TSM Tool Pro 1 Year Activation 1 PC", group: "TSM Tool", price: 35.00, delivery: "1-5 Minutes" },
      { name: "TSM Tool Pro 6 Months Activation 1 PC", group: "TSM Tool", price: 24.99, delivery: "1-5 Minutes" },
      { name: "TSM Tool Pro 3 Months Activation 1 PC", group: "TSM Tool", price: 14.99, delivery: "1-5 Minutes" },
      { name: "TSM Tool Pro Credits", group: "TSM Tool", price: 1.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Hydra Digital Activation
      // ═══════════════════════════════════════════════════════════
      { name: "Hydra Online Activation 12 Months [Without Box]", group: "Hydra Tool", price: 41.45, delivery: "1-10 Minutes" },
      { name: "Hydra Online Activation 6 Months [Without Box]", group: "Hydra Tool", price: 25.99, delivery: "1-10 Minutes" },
      { name: "Hydra Online Activation 3 Months [Without Box]", group: "Hydra Tool", price: 17.11, delivery: "1-10 Minutes" },
      { name: "Hydra Tool Credits Pack [50 Credits]", group: "Hydra Tool", price: 41.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // NCK Online Tool
      // ═══════════════════════════════════════════════════════════
      { name: "NCK Online Tool 1 Year Activation", group: "NCK Online Tool", price: 23.99, delivery: "1-5 Minutes" },
      { name: "NCK Online Tool 6 Months Activation", group: "NCK Online Tool", price: 14.99, delivery: "1-5 Minutes" },
      { name: "NCK Online Tool 3 Months Activation", group: "NCK Online Tool", price: 9.99, delivery: "1-5 Minutes" },
      { name: "NCK Online Tool 1 Month Activation", group: "NCK Online Tool", price: 6.99, delivery: "Instant" },

      // ═══════════════════════════════════════════════════════════
      // DFT Pro Tool
      // ═══════════════════════════════════════════════════════════
      { name: "DFT Pro Tool 1 Year Activation [New User]", group: "DFT Pro Tool", price: 73.79, delivery: "1-10 Minutes" },
      { name: "DFT Pro Tool 1 Year Activation [Existing User]", group: "DFT Pro Tool", price: 73.79, delivery: "1-10 Minutes" },
      { name: "DFT Pro Tool 2 Years Activation [New User]", group: "DFT Pro Tool", price: 153.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // KGFix Tool
      // ═══════════════════════════════════════════════════════════
      { name: "KGFix Tool Activation [1 Year 1 PC]", group: "KGFix Tool", price: 31.99, delivery: "1-24 Hours" },
      { name: "KGFix Tool Activation [6 Months 1 PC]", group: "KGFix Tool", price: 22.54, delivery: "1-24 Hours" },
      { name: "KGFix Tool Activation [3 Months 1 PC]", group: "KGFix Tool", price: 15.94, delivery: "1-24 Hours" },
      { name: "KGFixTool Credits [10 Credit Pack]", group: "KGFix Tool", price: 1.05, delivery: "1-24 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Hello AIO Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Hello AIO Tool [PayJoy | KG Lock | MDM] 1 Year 1 PC", group: "Hello AIO Tool", price: 50.04, delivery: "1-5 Minutes" },
      { name: "Hello AIO Tool [PayJoy | KG Lock | MDM] 6 Months 1 PC", group: "Hello AIO Tool", price: 29.50, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Borneo Schematic Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Borneo Schematics 1 User [12 Months]", group: "Borneo Schematic Tool", price: 35.99, delivery: "1-5 Minutes" },
      { name: "Borneo Schematics 1 User [6 Months]", group: "Borneo Schematic Tool", price: 20.90, delivery: "1-5 Minutes" },
      { name: "Borneo Schematics 1 User [3 Months]", group: "Borneo Schematic Tool", price: 12.90, delivery: "1-5 Minutes" },
      { name: "Borneo Schematics 2 Users [12 Months]", group: "Borneo Schematic Tool", price: 52.49, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Nice Unlocker Tool
      // ═══════════════════════════════════════════════════════════
      { name: "Nice Unlocker Tool [Samsung KG | MDM | FRP] 1 Year 1 PC", group: "Nice Unlocker Tool", price: 38.49, delivery: "1-5 Minutes" },
      { name: "Nice Unlocker Tool [Samsung KG | MDM | FRP] 6 Months 1 PC", group: "Nice Unlocker Tool", price: 28.59, delivery: "1-5 Minutes" },
      { name: "Nice Unlocker Tool [Samsung KG | MDM | FRP] 3 Months 1 PC", group: "Nice Unlocker Tool", price: 18.69, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Moto King Pro
      // ═══════════════════════════════════════════════════════════
      { name: "Moto King Pro Activation [1 Year 1 PC]", group: "Moto King Pro", price: 35.95, delivery: "1-5 Minutes" },
      { name: "Moto King Pro Activation [6 Months 1 PC]", group: "Moto King Pro", price: 31.00, delivery: "1-5 Minutes" },
      { name: "Moto King Pro Activation [3 Months 1 PC]", group: "Moto King Pro", price: 22.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Smart Tool Pro
      // ═══════════════════════════════════════════════════════════
      { name: "Smart Tool Pro Activation [12 Month 1 PC]", group: "Smart Tool Pro", price: 29.40, delivery: "1-5 Minutes" },
      { name: "Smart Tool Pro Activation [6 Month 1 PC]", group: "Smart Tool Pro", price: 24.40, delivery: "1-5 Minutes" },
      { name: "Smart Tool Pro Activation [3 Month 1 PC]", group: "Smart Tool Pro", price: 16.40, delivery: "1-5 Minutes" },
      { name: "Smart Tool Pro Activation [1 Month 1 PC]", group: "Smart Tool Pro", price: 10.40, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // General / Fast / Sim / Tira / Alseery Unlockers
      // ═══════════════════════════════════════════════════════════
      { name: "General Unlocker Pro Credits [Samsung | LG | Many More] New User", group: "General & Fast Unlocker Credits", price: 0.616, delivery: "1-10 Minutes" },
      { name: "General Unlocker Pro Credits [Existing Users]", group: "General & Fast Unlocker Credits", price: 0.616, delivery: "1-10 Minutes" },
      { name: "Fast Unlocker Pro Credits [Samsung | LG | Alcatel | TINNO] New User", group: "General & Fast Unlocker Credits", price: 0.616, delivery: "1-5 Minutes" },
      { name: "Sim-Unlocker Pro Credits [Samsung | LG | Alcatel | Google] New User", group: "General & Fast Unlocker Credits", price: 0.84, delivery: "1-5 Minutes" },
      { name: "Tira Unlocker Credits [Samsung | LG | Xiaomi | Vivo | Realme] New User", group: "General & Fast Unlocker Credits", price: 0.81, delivery: "1-5 Minutes" },
      { name: "Alseery Unlocker Credits [Samsung | LG | Motorola | Google] New User", group: "General & Fast Unlocker Credits", price: 0.715, delivery: "1-5 Minutes" },
      { name: "Deep Unlocker Tool 1 Year [New User]", group: "General & Fast Unlocker Credits", price: 56.50, delivery: "1-5 Minutes" },
      { name: "Deep Unlocker Tool Credits [New User]", group: "General & Fast Unlocker Credits", price: 0.65, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // DT Pro
      // ═══════════════════════════════════════════════════════════
      { name: "DT Pro Tool 1 Year Activation Code", group: "DT Pro", price: 16.20, delivery: "1-5 Minutes" },
      { name: "DT Pro Credits For Existing User", group: "DT Pro", price: 4.59, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // GPT PRO Tool
      // ═══════════════════════════════════════════════════════════
      { name: "GPT PRO Tool Activation (6 Months 1 PC)", group: "GPT PRO Tool", price: 27.00, delivery: "1-5 Minutes" },
      { name: "GPT PRO Tool Activation (3 Months 1 PC)", group: "GPT PRO Tool", price: 18.00, delivery: "1-5 Minutes" },
      { name: "GPT PRO Tool Activation (1 Month 1 PC)", group: "GPT PRO Tool", price: 9.60, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // TR Tools Pro
      // ═══════════════════════════════════════════════════════════
      { name: "TR Tools Pro 1 Year [New User]", group: "TR Tools Pro", price: 55.29, delivery: "1-10 Minutes" },
      { name: "TR Tools Pro 2 Years [New User]", group: "TR Tools Pro", price: 129.49, delivery: "1-10 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // AndroidWinTool [AWT]
      // ═══════════════════════════════════════════════════════════
      { name: "AndroidWinTool [AWT] 1 Year [1 PC]", group: "AndroidWinTool [AWT]", price: 35.19, delivery: "1-5 Minutes" },
      { name: "AndroidWinTool [AWT] 3 Months [1 PC]", group: "AndroidWinTool [AWT]", price: 24.74, delivery: "1-5 Minutes" },
      { name: "AndroidWinTool [AWT] 1 Month [1 PC]", group: "AndroidWinTool [AWT]", price: 15.28, delivery: "1-5 Minutes" },
      { name: "AndroidWinTool [AWT] Credits", group: "AndroidWinTool [AWT]", price: 0.98, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Odin Activation
      // ═══════════════════════════════════════════════════════════
      { name: "Muslim Odin Activation | 1 Year", group: "Odin Activation", price: 21.99, delivery: "1-5 Minutes" },
      { name: "Muslim Odin Activation | 2 Year", group: "Odin Activation", price: 42.90, delivery: "1-5 Minutes" },
      { name: "Muslim Odin Activation | 3 Year", group: "Odin Activation", price: 64.99, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // MaAnt Maintenance Tool
      // ═══════════════════════════════════════════════════════════
      { name: "MaAnt Maintenance Software [1 PC - 1 Year]", group: "MaAnt Maintenance Tool", price: 41.00, delivery: "1-5 Minutes" },
      { name: "MaAnt Maintenance Software [1 PC - 1 Month]", group: "MaAnt Maintenance Tool", price: 4.80, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // E-GSM Tool
      // ═══════════════════════════════════════════════════════════
      { name: "E-GSM Tool 1 Year Activation [New/Old Users]", group: "E-GSM Tool", price: 54.50, delivery: "1-5 Minutes" },
      { name: "E-GSM Tool 10 Credits", group: "E-GSM Tool", price: 1.13, delivery: "1-5 Minutes" },
    ],
  },

  remote: {
    title: "Place A New Remote Order",
    icon: Wifi,
    services: [
      // ═══════════════════════════════════════════════════════════
      // GSM Tools Rent Service – Instant
      // ═══════════════════════════════════════════════════════════
      { name: "Android Multitool Rent (AMT) - 2 Hours", group: "GSM Tools Rent Service – Instant", price: 0.40, delivery: "Instant", tag: "NEW" },
      { name: "MDM Fix Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.40, delivery: "Instant", tag: "NEW" },
      { name: "TFM Tool Rent [5 Hours]", group: "GSM Tools Rent Service – Instant", price: 0.80, delivery: "Instant", tag: "NEW" },
      { name: "TSM Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.00, delivery: "Instant", tag: "NEW" },
      { name: "Unlock Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 2.50, delivery: "Instant", tag: "NEW" },
      { name: "Cheetah Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.50, delivery: "Instant", tag: "NEW" },
      { name: "Hydra Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 2.00, delivery: "Instant", tag: "NEW" },
      { name: "EFT Pro Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 1.80, delivery: "Instant", tag: "NEW" },
      { name: "Octoplus Tool Rent [6 Hours]", group: "GSM Tools Rent Service – Instant", price: 2.20, delivery: "Instant", tag: "NEW" },

      // ═══════════════════════════════════════════════════════════
      // iRemoval Pro
      // ═══════════════════════════════════════════════════════════
      { name: "iRemoval Pro Premium Hello Bypass – iPad", group: "iRemoval Pro", price: 18.00, delivery: "1-24 Hours" },
      { name: "iRemoval Pro Premium Hello Bypass – iPhone", group: "iRemoval Pro", price: 25.00, delivery: "1-24 Hours" },
      { name: "iRemoval Pro Premium SIM Unlock – iPhone", group: "iRemoval Pro", price: 35.00, delivery: "1-24 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Remote FRP Services
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung FRP Remote Service – All Models", group: "Remote FRP Services", price: 8.00, delivery: "30 Minutes" },
      { name: "Xiaomi FRP Remote Service", group: "Remote FRP Services", price: 6.00, delivery: "30 Minutes" },
      { name: "Huawei/Honor FRP Remote Service", group: "Remote FRP Services", price: 10.00, delivery: "30 Minutes" },
      { name: "Motorola FRP Remote Service", group: "Remote FRP Services", price: 7.00, delivery: "30 Minutes" },
      { name: "LG FRP Remote Service – All Models", group: "Remote FRP Services", price: 8.00, delivery: "30 Minutes" },
      { name: "Google Pixel FRP Remote Service", group: "Remote FRP Services", price: 12.00, delivery: "30 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Remote Samsung KG / MDM
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung Knox Guard (KG) Remote Bypass", group: "Remote Samsung KG & MDM", price: 15.00, delivery: "1-6 Hours" },
      { name: "Samsung MDM Remote Remove – All Models", group: "Remote Samsung KG & MDM", price: 12.00, delivery: "1-6 Hours" },
      { name: "Samsung IT Admin Remote Reset", group: "Remote Samsung KG & MDM", price: 10.00, delivery: "1-6 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Remote iPhone Services
      // ═══════════════════════════════════════════════════════════
      { name: "iPhone iCloud Bypass Remote [No Signal] A12+", group: "Remote iPhone Services", price: 5.00, delivery: "30 Minutes" },
      { name: "iPhone MDM Remote Bypass – All iOS Versions", group: "Remote iPhone Services", price: 4.00, delivery: "30 Minutes" },
      { name: "iPhone Passcode Disable Remote Bypass", group: "Remote iPhone Services", price: 8.00, delivery: "1-2 Hours" },
    ],
  },

  file: {
    title: "Place A New File Order",
    icon: FileText,
    services: [
      // ═══════════════════════════════════════════════════════════
      // Nokia SL3 Bruteforce
      // ═══════════════════════════════════════════════════════════
      { name: "SL3 BRUTEFORCE FAST (1-24 HOURS)", group: "Nokia SL3 BruteForce Service", price: 5.50, delivery: "1-24 Hours" },
      { name: "SL3 BRUTEFORCE - SLOW (1-48 HOURS)", group: "Nokia SL3 BruteForce Service", price: 4.50, delivery: "1-48 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Samsung Firmware Files
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung Firmware File – Any Model", group: "Firmware Files", price: 3.00, delivery: "Instant" },
      { name: "Samsung Full 4 Files Firmware – Any Model", group: "Firmware Files", price: 5.00, delivery: "1-5 Minutes" },
      { name: "Samsung Combination File – Any Model", group: "Firmware Files", price: 2.50, delivery: "Instant" },
      { name: "Samsung Cert File (EFS/NVM) – Any Model", group: "Firmware Files", price: 8.00, delivery: "1-24 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Huawei Firmware Files
      // ═══════════════════════════════════════════════════════════
      { name: "Huawei Firmware File – Any Model", group: "Firmware Files", price: 4.00, delivery: "1-5 Minutes" },
      { name: "Huawei FRP Firmware File", group: "Firmware Files", price: 5.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Xiaomi / Other Firmware
      // ═══════════════════════════════════════════════════════════
      { name: "Xiaomi Firmware File – Any Model", group: "Firmware Files", price: 3.00, delivery: "Instant" },
      { name: "Motorola Firmware File – Any Model", group: "Firmware Files", price: 3.50, delivery: "1-5 Minutes" },
      { name: "LG Firmware File – Any Model", group: "Firmware Files", price: 3.00, delivery: "1-5 Minutes" },

      // ═══════════════════════════════════════════════════════════
      // Network Unlock Files
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung Network Unlock File", group: "Network Unlock Files", price: 8.00, delivery: "1-24 Hours" },
      { name: "LG Network Unlock File", group: "Network Unlock Files", price: 6.00, delivery: "1-24 Hours" },
      { name: "Motorola Network Unlock File", group: "Network Unlock Files", price: 7.00, delivery: "1-24 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Certificates & Backup
      // ═══════════════════════════════════════════════════════════
      { name: "Samsung EFS/NVM Certificate Backup", group: "Certificates & Backup", price: 10.00, delivery: "1-3 Hours" },
      { name: "QCN File Service – Qualcomm Devices", group: "Certificates & Backup", price: 12.00, delivery: "1-24 Hours" },
      { name: "Samsung IMEI Repair File (Cert Write)", group: "Certificates & Backup", price: 15.00, delivery: "1-24 Hours" },

      // ═══════════════════════════════════════════════════════════
      // Scatter / Boot Files
      // ═══════════════════════════════════════════════════════════
      { name: "MediaTek Scatter File – Any Model", group: "Scatter & Boot Files", price: 4.00, delivery: "1-5 Minutes" },
      { name: "Qualcomm Prog/Firehose File – Any Model", group: "Scatter & Boot Files", price: 5.00, delivery: "1-24 Hours" },
      { name: "Samsung MDM Remove File", group: "Scatter & Boot Files", price: 6.00, delivery: "1-24 Hours" },
      { name: "Samsung KG (Knox Guard) Remove File", group: "Scatter & Boot Files", price: 8.00, delivery: "1-24 Hours" },
    ],
  },
};
