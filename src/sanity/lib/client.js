// src/sanity/lib/client.js
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: process.env.NODE_ENV === 'production', // Only use CDN in production
  perspective: 'published', // Add this for better caching
})