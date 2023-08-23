import RouteLayout from "../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../Components/Layout/PageLayout";

export default function BudgetImportDetails() {
  return (
    <RouteLayout>
      <PageLayout hasBack={true} title={"Budget Details"}>
        <section className="flex flex-col mt-9">
          <div>
            <div className="flex gap-4 w-full">
              {/* section one */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Serial No</div>
                  <input
                    placeholder="020"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Total (N) - (Qty*Unit Price)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Amount Spent (approved amount)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Item</div>
                  <input className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              {/* section two */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Serial No</div>
                  <input
                    placeholder="020"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Total (N) - (Qty*Unit Price)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Amount Spent (approved amount)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Item</div>
                  <input className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              {/* section three */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Serial No</div>
                  <input
                    placeholder="020"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Total (N) - (Qty*Unit Price)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">
                    Amount Spent (approved amount)
                  </div>
                  <input
                    placeholder="999,000,000.00"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-primary/50 text-sm">Item</div>
                  <input className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
