import { createLazyFileRoute } from '@tanstack/react-router'
import { DownloadArchive } from '../components/account/DownloadArchive'

export const Route = createLazyFileRoute('/gameversions')({
  component: DownloadArchive
})