// src/services/storage.service.ts
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { Storage as GoogleStorage } from '@google-cloud/storage'
import path from 'path'
import { RequestHandler } from 'express'

export interface StorageService {
  uploadFile(fieldName: string): RequestHandler // Accept fieldName
  getFileUrl(filename: string, folder?: string): string // Optional folder
}

const googleStorage = new GoogleStorage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILENAME, // Path to your service account key file
})

export class LocalStorageService implements StorageService {
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.params.folder || 'uploads' // Use optional folder
      const destinationPath = path.join(process.cwd(), folder)
      cb(null, destinationPath)
    },
    filename: (req, file, cb) => {
      const uniqueFilename = uuidv4() + path.extname(file.originalname)
      cb(null, uniqueFilename)
    },
  })

  public uploadFile(fieldName: string): RequestHandler {
    return multer({ storage: this.storage }).single(fieldName)
  }

  public getFileUrl(filename: string, folder: string = 'uploads'): string {
    return `/${folder}/${filename}`
  }
}

export class GoogleCloudStorageService implements StorageService {
  private bucket = googleStorage.bucket(process.env.GCS_BUCKET || 'default-bucket')

  public uploadFile(fieldName: string): RequestHandler {
    const storage = multer.memoryStorage() // Store file in memory
    return multer({ storage }).single(fieldName)
  }

  public getFileUrl(filename: string, folder: string = 'uploads'): string {
    return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${folder}/${filename}`
  }

  public async uploadToGCS(file: Express.Multer.File, folder: string): Promise<string> {
    const filename = uuidv4() + path.extname(file.originalname)
    const key = `${folder}/${filename}`

    const fileUpload = this.bucket.file(key)

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
      public: true, // Make the file publicly accessible
    })

    return filename
  }
}

export const storageService: StorageService =
  process.env.STORAGE_TYPE === 'gcs' ? new GoogleCloudStorageService() : new LocalStorageService()
