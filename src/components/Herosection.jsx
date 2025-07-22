const HeroSection = () => {
    return (
      <div className="bg-white">
        {/* Paan Corner Section */}
        <div className="mb-6 px-10 mt-4">
          <button className="rounded-lg w-full">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.21.0/tr:w-1438,ar-1438-265,pr-true,f-auto,q-80//images/paan-corner/paan-corner-desktop.png"
              alt="Paan Corner"
              className="w-full rounded-lg"
            />
          </button>
        </div>
  
        {/* McCain Smileys Section */}
        <div className="mb-6 px-10">
          <button className="rounded-lg w-full">
            <img
              src="https://cdn.zeptonow.com/production///tr:w-1280,ar-1312-192,pr-true,f-auto,q-80/inventory/banner/57a42c2f-6b28-41f7-bf64-f0d15382338b.png"
              alt="McCain Smileys"
              className="w-full rounded-lg"
            />
          </button>
        </div>
  
        {/* New Offers Section */}
        <div className="px-10 mb-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                name: "Weekend Fresh Sale",
                image: "https://cdn.zeptonow.com/production///tr:w-912,ar-912-570,pr-true,f-auto,q-80/inventory/banner/8bd2b177-aa6c-406e-91f8-18bbe15ffbc4.png",
              },
              {
                name: "Baby Store",
                image: "https://cdn.zeptonow.com/production///tr:w-1216,ar-1216-760,pr-true,f-auto,q-80/inventory/banner/67606f18-ab75-4fb9-b66a-195d4874eab6.png",
              },
              {
                name: "Free Smileys",
                image: "https://cdn.zeptonow.com/production///tr:w-912,ar-912-570,pr-true,f-auto,q-80/inventory/banner/5246bdd2-9a41-4d7b-8ae3-73420efd7cb7.png",
              },
              {
                name: "Frizz-Free Hair",
                image: "https://cdn.zeptonow.com/production///tr:w-912,ar-912-570,pr-true,f-auto,q-80/inventory/banner/2afb9ed9-a8aa-4130-815b-54f9758161f4.png",
              },
            ].map((offer, index) => (
              <button key={index} className="rounded-lg w-full">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
  
        {/* Glam Up Section */}
        <div className="mb-6 px-10">
          <button className="rounded-lg w-full">
            <img
              src="https://cdn.zeptonow.com/production///tr:w-1280,ar-1440-500,pr-true,f-auto,q-80/inventory/banner/09cdf2f1-209a-48df-b720-27997372b527.png"
              alt="Glam Up Savings"
              className="w-full rounded-lg"
            />
          </button>
        </div>
  
        {/* Makeup Tools Section */}
        <div className="px-10 mb-6">
          <h2 className="text-xl font-extrabold mb-4">Makeup Tools</h2>
          <div className="grid grid-cols-9 gap-4 justify-start">
            {[
              {
                name: "Eyes",
                image: "https://cdn.zeptonow.com/production///tr:w-160,ar-416-368,pr-true,f-auto,q-80/inventory/banner/d363d175-5932-44f4-bc55-fd7fb1018004.png",
              },
              {
                name: "Lips",
                image: "https://cdn.zeptonow.com/production///tr:w-160,ar-416-368,pr-true,f-auto,q-80/inventory/banner/d363d175-5932-44f4-bc55-fd7fb1018004.png",
              },
              {
                name: "Face",
                image: "https://cdn.zeptonow.com/production///tr:w-160,ar-416-368,pr-true,f-auto,q-80/inventory/banner/d363d175-5932-44f4-bc55-fd7fb1018004.png",
              },
              {
                name: "Makeup Tools",
                image: "https://cdn.zeptonow.com/production///tr:w-160,ar-416-368,pr-true,f-auto,q-80/inventory/banner/d363d175-5932-44f4-bc55-fd7fb1018004.png",
              },
            ].map((tool, index) => (
              <div key={index} className="text-left">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="h-28 w-22 rounded-full mb-2"
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* New In Store Section */}
        <div className="px-10">
          <h2 className="text-xl font-extrabold mb-6">New In Store</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { image: "https://cdn.zeptonow.com/production///tr:w-640,ar-640-464,pr-true,f-auto,q-80/inventory/banner/31edb271-b2f6-4b12-8ba6-4a7843a95540.png" },
              { image: "https://cdn.zeptonow.com/production///tr:w-640,ar-640-464,pr-true,f-auto,q-80/inventory/banner/9c15fd2c-b353-4188-8b58-89edeae30c25.png" },
              { image: "https://cdn.zeptonow.com/production///tr:w-416,ar-416-464,pr-true,f-auto,q-80/inventory/banner/2ee60851-c4ba-464e-a965-f82fb607a940.png" },
              { image: "https://cdn.zeptonow.com/production///tr:w-416,ar-416-464,pr-true,f-auto,q-80/inventory/banner/0908a28b-713b-4d13-824b-0bbc5b2ebd1a.png" },
              { image: "https://cdn.zeptonow.com/production///tr:w-416,ar-416-464,pr-true,f-auto,q-80/inventory/banner/aa3ed677-6164-4c53-b660-f12bc13032eb.png" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image}
                  alt={`New Store ${index}`}
                  className="h-44 w-38 mx-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Grocery & Kitchen Section */}
        <div className="px-10">
          <h2 className="text-xl font-extrabold mb-6">Grocery & Kitchen</h2>
          <div className="grid grid-cols-7 gap-4">
            {[
              {
                name: "Fruits & Vegetables",
                image: "https://cdn.zeptonow.com/production///tr:w-420,ar-486-333,pr-true,f-auto,q-80/cms/category/2b5f2be5-cada-4cd7-b0af-e46c0c065f71.png",
              },
              {
                name: "Dairy, Bread & Eggs",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/4b28a9a2-8714-455c-ad17-fa765bbc3576.png",
              },
              {
                name: "Atta, Rice, Oil & Dals",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/54dd01e1-2781-4a45-bc3a-ed53ebab9bd9.png",
              },
              {
                name: "Meats, Fish & Eggs",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-334,pr-true,f-auto,q-80/cms/category/9eda9af5-735b-4772-8e48-57f74e9d5547.png",
              },
              {
                name: "Masala & Dry Fruits",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/8d4d3977-5197-49d9-9867-8a670524e48b.png",
              },
              {
                name: "Breakfast & Sauces",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/ab241d87-da5b-4830-b38f-1a6cd30d0d41.png",
              },
              {
                name: "Packaged Food",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/47b3a34d-8f9f-42fe-97a0-4d8350748924.png",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-38 mx-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Snacks & Drinks Section */}
        <div className="px-10 mt-6">
          <h2 className="text-xl font-extrabold mb-6">Snacks & Drinks</h2>
          <div className="grid grid-cols-7 gap-4">
            {[
              {
                name: "Tea, Coffee & More",
                image: "https://cdn.zeptonow.com/production///tr:w-420,ar-486-333,pr-true,f-auto,q-80/cms/category/e35f8d62-e623-4b52-9aef-cb45cc26c318.png",
              },
              {
                name: "Ice Creams & More",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/31a3c3bd-1c0e-48ad-9441-0ba1c2552e3d.png",
              },
              {
                name: "Frozen Food",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/366e5b7d-2028-4935-b9f1-75bfa085c3d7.png",
              },
              {
                name: "Sweet Cravings",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/f76de631-1706-48c4-bf05-5161b8dbe9c9.png",
              },
              {
                name: "Cold Drinks & Juices",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/59d2c0cc-e776-407c-9142-7e69898d9eab.png",
              },
              {
                name: "Munchies",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/90b2faee-1461-465a-a8c6-8c84716dd7dc.png",
              },
              {
                name: "Biscuits & Cookies",
                image: "https://cdn.zeptonow.com/production///tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/9b88fff5-73f5-46fd-999f-1622db4203d7.png",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-38 mx-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  