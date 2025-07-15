import { createWorker } from 'tesseract.js'

export default function useOCRReceipt({ onExtract, setFormData } = {}) {
    const handleReceiptUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const worker = await createWorker(`eng`)

        await worker.setParameters({
            tessedit_char_whitelist:
                `₱0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,`,
        })

        const { data: { text: rawText }} = await worker.recognize(file)

        const text = rawText.replace(
            /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
            `$1+`
        )

        const refMatch =
            text.match(
                /(?:Reference\s*No\.?|Ref(?:erence)?\s*#?\s*No\.?)\s*[:\-]?\s*([A-Za-z0-9]{8,})/i
            ) || text.match(/([0-9]{13,})/)
        const referenceNumber = refMatch ? refMatch[1] : `Not found`

        const amountMatch =
            text.match(/₱\s*([+-]?[\d,]+\.\d{2})/) ||
            text.match(/Amount\s*[:\-]?\s*([+-]?[\d,]+\.\d{2})/i)
        const amount = amountMatch ? amountMatch[1] : `Not found`

        const parsedAmount = amount !== `Not found` ? parseFloat(amount.replace(/,/g, ``)) : ``

        await worker.terminate()

        const extractedData = {
            refNumber: referenceNumber,
            downpayment: parsedAmount,
            rawText,
        }

        if (typeof setFormData === `function`) {
            setFormData((prev) => ({
                ...prev,
                ...extractedData,
            }))
        }

        if (typeof onExtract === `function`) {
            onExtract(extractedData)
        }

        return extractedData
    }

    return handleReceiptUpload
}
