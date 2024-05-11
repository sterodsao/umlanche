import { Module } from '@nestjs/common'
import { EnvModule } from './infra/env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { HttpModule } from './infra/http/http.module'
import { EventsModule } from './infra/events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
