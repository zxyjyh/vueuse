import type { MaybeRef } from '@vueuse/shared'
import { isClient } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import QRCode from 'qrcode'

/**
 * Wrapper for qrcode.
 *
 * @see https://vueuse.org/useQRCode
 * @param text
 * @param options
 */
export function useQRCode(
  text: MaybeRef<string>,
  options?: QRCode.QRCodeToDataURLOptions,
) {
  const src = ref(text)
  const result = ref('')

  watch(
    src,
    async(value) => {
      if (src.value && isClient)
        result.value = await QRCode.toDataURL(value, options)
    },
    { immediate: true },
  )

  return result
}
