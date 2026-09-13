import { createClient } from '@/lib/supabase/server'
import { Edit, Trash2 } from 'lucide-react'

export const metadata = {
  title: 'Merchandise CMS - Admin',
}

export default async function AdminMerchCMSPage() {
  const supabase = await createClient()

  // For merch, assuming a 'products' table
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">STORE MERCHANDISE</h1>
          <p className="font-mono text-xs text-[#999]">Manage products, inventory, and pricing.</p>
        </div>
        
        <button className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors whitespace-nowrap">
          + ADD_PRODUCT
        </button>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">PRODUCT</th>
                <th className="px-4 py-3 font-normal">CATEGORY</th>
                <th className="px-4 py-3 font-normal">PRICE</th>
                <th className="px-4 py-3 font-normal">STOCK</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products?.map(p => (
                <tr key={p.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-white">{p.name}</td>
                  <td className="px-4 py-3 text-[#999]">{p.category}</td>
                  <td className="px-4 py-3 text-[#999]">₹{p.price}</td>
                  <td className="px-4 py-3">
                    {/* Mock stock logic since we don't have variants array in this simple view */}
                    <span className={p.stock > 10 ? 'text-green-400' : p.stock > 0 ? 'text-orange-400' : 'text-red-400'}>
                      {p.stock} IN STOCK
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] ${
                      p.status === 'active' ? 'border-[#2463FF] text-[#2463FF]' :
                      'border-[#4A4A4A] text-[#999]'
                    }`}>
                      {p.status?.toUpperCase() || 'DRAFT'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-[#999] hover:text-[#2463FF] transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-[#999] hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!products || products.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_PRODUCTS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
