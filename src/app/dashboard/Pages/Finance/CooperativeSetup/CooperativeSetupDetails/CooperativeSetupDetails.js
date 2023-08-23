import RouteLayout from "../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../Components/Layout/PageLayout";
export default function CooperativeSetupDetails() {
  return (
    <RouteLayout>
      <PageLayout hasBack={true} title={"Cooperative Setup Details"}>
        <section className="flex flex-col">
          <div className="bg-[#D9E9DA]/50 flex p-4 rounded-md mb-6">
            <div className=" font-bold whitespace-nowrap w-[30%]">
              Process Information
            </div>
            <div className="flex justify-between w-full">
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Initiated By:</div>
                  <div>Matt Fawibe</div>
                </div>
                <div>
                  <div className="text-[#6E9170]">Date:</div>
                  <div>14 Dec 2022</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Created By:</div>
                  <div>Matt Fawibe</div>
                </div>
                <div>
                  <div className="text-[#6E9170]">Date:</div>
                  <div>14 Dec 2022</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Approved By:</div>
                  <div>Matt Fawibe</div>
                </div>
                <div>
                  <div className="text-[#6E9170]">Date:</div>
                  <div>14 Dec 2022</div>
                </div>
              </div>
            </div>
            <div className="w-[10%]" />
          </div>
          <div className="bg-[#D9E9DA]/50 flex p-4 rounded-md mb-6">
            <div className=" font-bold whitespace-nowrap w-[30%]">
              Basic Information
            </div>
            <div className="flex justify-between w-full">
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">ID:</div>
                  <div>001</div>
                </div>
                <div>
                  <div className="text-[#6E9170]">Component Description</div>
                  <div>Monthly Base Salary</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Component Type:</div>
                  <div>Salary</div>
                </div>
                <div>
                  <div className="text-[#6E9170]">Shortcode:</div>
                  <div>SAL</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col ">
                <div>
                  <div className="text-[#6E9170]">Component Title:</div>
                  <div>Base Salary</div>
                </div>
              </div>
            </div>
            <div className="w-[10%]" />
          </div>
          <div className="bg-[#D9E9DA]/50 flex p-4 rounded-md mb-6">
            <div className=" font-bold whitespace-nowrap w-[30%]">
              Approval Information
            </div>
            <div className="flex justify-between w-full">
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Initiated By:</div>
                  <div>Matt Fawibe</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Created By:</div>
                  <div>Matt Fawibe</div>
                </div>
              </div>
              <div className="gap-4 flex flex-col">
                <div>
                  <div className="text-[#6E9170]">Approved By:</div>
                  <div>Matt Fawibe</div>
                </div>
              </div>
            </div>
            <div className="w-[10%]" />
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
