import Button from "@/app/components/Button";
import Image from "next/image";
import ChevronSvg from "@/../public/svg/chevron.svg";
import { MouseEventHandler, useState } from "react";
import classNames from "classnames";
import { Category } from "@/__generated__/graphql";
import NavbarModal from "./NavbarModal";

export default function CategoryModal({
  categories,
  onDismissModal,
}: {
  categories: Category[];
  onDismissModal: MouseEventHandler;
}) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const isExpanded = (id: number) => expandedIds.includes(id);

  const handleExpansion = (id: number) => {
    if (isExpanded(id)) {
      setExpandedIds(expandedIds.filter((eId) => eId !== id));
    } else {
      setExpandedIds(expandedIds.concat(id));
    }
  };

  return (
    <NavbarModal onOverlayClick={onDismissModal}>
      <div className="p-4 bg-white max-h-screen overflow-y-scroll pb-14">
        <h5>Product Categories</h5>
        <div>
          {categories.map((cat) => (
            <div key={cat.id}>
              <div
                className="flex items-center my-4"
                onClick={() => handleExpansion(cat.id)}
              >
                <Image
                  src={cat.image}
                  width={40}
                  height={40}
                  alt=""
                  className="mr-3"
                />
                <h6 className="flex-1">{cat.name}</h6>
                <div
                  className={classNames(
                    "w-6 h-6",
                    isExpanded(cat.id) ? "-rotate-90" : "rotate-90"
                  )}
                >
                  <ChevronSvg />
                </div>
              </div>

              {isExpanded(cat.id) && (
                <div>
                  {cat.subcategories.map((subcat) => (
                    <div
                      className="flex items-center my-4 ml-4"
                      key={subcat.id}
                    >
                      <Image
                        src={subcat.image}
                        width={35}
                        height={35}
                        alt=""
                        className="mr-3"
                      />
                      <h6 className="flex-1 text-sm">{subcat.name}</h6>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </NavbarModal>
  );
}
